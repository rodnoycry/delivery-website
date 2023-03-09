'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getItems = exports.handleNewOrder = void 0
const firestore_1 = require('firebase-admin/firestore')
const firebase_1 = require('../../firebase')
const functions_1 = require('./../../../client/src/functions')
const config_1 = require('./../../../client/src/config')
const cacheDb_1 = require('../../functions/cacheDb')
const handleNewOrder = (req, res) => {
    const order = req.body
    getOrderErrorsObject(order)
        .then((errorData) => {
            if (errorData) {
                res.status(400).send(errorData)
                return
            }
            createOrder(order)
                .then(() => {
                    ;(0, cacheDb_1.cacheOrdersDb)()
                    res.status(201).send()
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).json(error).send()
                })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error).send()
        })
}
exports.handleNewOrder = handleNewOrder
const createOrder = async (order) => {
    const counterDocRef = firebase_1.db.collection('counters').doc('orders')
    try {
        const id = await firebase_1.db.runTransaction(async (t) => {
            const itemsCounterDoc = await t.get(counterDocRef)
            const counter = itemsCounterDoc.data().counter
            const id = counter + 1
            t.update(counterDocRef, { counter: id })
            return id
        })
        const stringId = id.toString().padStart(6, '0')
        const serverOrder = Object.assign(Object.assign({}, order), {
            id: stringId,
        })
        const docRef = firebase_1.db.collection('orders').doc(stringId)
        await docRef.set(serverOrder)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
const errorMessageObj = {
    invalidValues: 'Пожалуйста, введите все необходимые поля',
    sumError: 'Недостаточная сумма для доставки в выбранную зону',
}
const getOrderErrorsObject = async ({
    zone,
    cart,
    phone,
    name,
    deliveryType,
    locality,
    street,
    house,
    deliveryTimeType,
    deliveryTime,
}) => {
    const result = {}
    // Sum validation
    const ids = cart.map((cartItemData) => cartItemData.id)
    let itemsData
    try {
        itemsData = await (0, exports.getItems)(ids)
    } catch (error) {
        console.error(error)
        throw new Error(`getItem() error in getOrderErrorsObject()`)
    }
    const sum = (0, functions_1.getSum)(cart, itemsData)
    const minSum = config_1.zoneDeliveryInfo[zone].minSum
    if (minSum > sum) {
        result.errorMessage = errorMessageObj.sumError
        return result
    }
    // Input validation
    const errorData = {
        hasError: true,
        isRed: true,
    }
    let isValid = true
    result.errorObject = {}
    if (!(phone === null || phone === void 0 ? void 0 : phone.trim())) {
        isValid = false
        result.errorObject.PhoneInput = errorData
    }
    if (!(name === null || name === void 0 ? void 0 : name.trim())) {
        isValid = false
        result.errorObject.NameInput = errorData
    }
    if (deliveryType === 'На указанный адрес') {
        if (
            zone !== 'Талдом' &&
            !(locality === null || locality === void 0
                ? void 0
                : locality.trim())
        ) {
            isValid = false
            result.errorObject.LocalityInput = errorData
        }
        if (!street) {
            isValid = false
            result.errorObject.StreetInput = errorData
        }
        if (!house) {
            isValid = false
            result.errorObject.HouseInput = errorData
        }
    }
    if (deliveryTimeType === 'Ко времени') {
        if (!deliveryTime) {
            isValid = false
            result.errorObject.TimeInput = errorData
        }
    }
    result.errorMessage = isValid ? undefined : errorMessageObj.invalidValues
    return isValid ? null : result
}
const getItems = async (ids) => {
    const ref = firebase_1.db.collection('items')
    const docData = await ref
        .where(firestore_1.FieldPath.documentId(), 'in', ids)
        .where('isActive', '==', true)
        .get()
    const docItems = docData.docs
    const items = docItems.map((docItem) => docItem.data())
    return items
}
exports.getItems = getItems
// # sourceMappingURL=newOrder.js.map
