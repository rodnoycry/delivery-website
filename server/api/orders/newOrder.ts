import { FieldPath } from 'firebase-admin/firestore'
import type { Request, Response } from 'express'
import { io } from '../../server'
import { auth, db } from '../../firebase'
import { ItemData, ServerOrder } from '../../interfaces'
import { getSum } from '../../functions'
import { zoneDeliveryInfo } from '../../config'
import { cacheOrdersDb } from '../../functions/cacheDb'
import { sendOrdersToUserWithSocket } from './functions'

export const handleNewOrder = (req: Request, res: Response): void => {
    const order: ServerOrder = req.body.order
    const idToken = req.body?.idToken
    const sessionId = req.cookies.sessionId
    console.log(req)
    console.log(sessionId)
    getOrderErrorsObject(order)
        .then((errorData) => {
            if (errorData) {
                res.status(400).send(errorData)
                return
            }
            createOrder(order, idToken, sessionId)
                .then(({ orderId, uid }) => {
                    cacheOrdersDb()
                        .then(() => {
                            res.status(201).send({ orderId })
                            if (uid) {
                                sendOrdersToUserWithSocket(uid)
                            }
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
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error).send()
        })
}

const createOrder = async (
    order: ServerOrder,
    idToken: string | undefined,
    sessionId: string | undefined
): Promise<{ orderId: string; uid?: string }> => {
    const counterDocRef = db.collection('counters').doc('orders')
    try {
        const id = await db.runTransaction(async (t) => {
            const itemsCounterDoc: any = await t.get(counterDocRef)
            const counter = itemsCounterDoc.data().counter
            const id = (counter as number) + 1
            t.update(counterDocRef, { counter: id })
            return id
        })
        const stringId = id.toString().padStart(6, '0')
        const serverOrder: ServerOrder & Record<string, any> = {
            ...order,
            id: stringId,
            status: 'new',
            isNewStatus: true,
        }
        if (sessionId) {
            serverOrder.sessionId = sessionId
        }
        let uid
        if (idToken) {
            const decodedToken = await auth.verifyIdToken(idToken)
            uid = decodedToken.uid
            serverOrder.uid = uid
        }
        const docRef = db.collection('orders').doc(stringId)
        await docRef.set(serverOrder)
        return { orderId: stringId, uid }
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}

interface ErrorData {
    hasError?: boolean
    isRed?: boolean
}
type OrderError = Record<keyof ServerOrder, ErrorData>

interface OrderErrorData {
    errorMessage: string
    errorObject?: OrderError
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
}: ServerOrder): Promise<OrderErrorData | null> => {
    const result: Record<string, any> = {}
    // Sum validation
    const ids: string[] = cart.map((cartItemData) => cartItemData.id)
    let itemsData
    try {
        itemsData = await getItems(ids)
    } catch (error) {
        console.error(error)
        throw new Error(`getItem() error in getOrderErrorsObject()`)
    }
    const sum = getSum(cart, itemsData)
    const minSum =
        zoneDeliveryInfo[zone as keyof typeof zoneDeliveryInfo].minSum
    if (minSum > sum) {
        result.errorMessage = errorMessageObj.sumError
        return result as OrderErrorData
    }

    // Input validation
    const errorData = {
        hasError: true,
        isRed: true,
    }
    let isValid = true
    result.errorObject = {}
    if (!phone?.trim()) {
        isValid = false
        result.errorObject.PhoneInput = errorData
    }
    if (!name?.trim()) {
        isValid = false
        result.errorObject.NameInput = errorData
    }
    if (deliveryType === 'На указанный адрес') {
        if (zone !== 'Талдом' && !locality?.trim()) {
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
    return isValid ? null : (result as OrderErrorData)
}

export const getItems = async (ids: string[]): Promise<ItemData[]> => {
    const ref = db.collection('items')
    const docData = await ref
        .where(FieldPath.documentId(), 'in', ids)
        .where('isActive', '==', true)
        .get()
    const docItems = docData.docs
    const items = docItems.map((docItem) => docItem.data())
    return items as ItemData[]
}
