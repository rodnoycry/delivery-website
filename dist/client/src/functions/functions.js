'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getSumWithDelivery = exports.getSum = exports.getItemsData = void 0
const config_1 = require('./../config')
const items_1 = require('./../services/apiService/items')
const getItemsData = async (cart, setItemsData) => {
    const ids = cart.map((cartItemData) => cartItemData.id)
    const itemsData = await (0, items_1.getItems)(undefined, undefined, ids)
    setItemsData(itemsData)
}
exports.getItemsData = getItemsData
const getSum = (cart, itemsData) => {
    let sum = 0
    cart.map(({ id, selected }) => {
        const filteredItemsData = itemsData.filter(
            (itemData) => itemData.id === id
        )
        filteredItemsData.map(({ price, type }) => {
            if (type === 'pizza' || type === 'wok') {
                selected = typeof selected === 'number' ? selected : 0
                price = Array.isArray(price) ? price : [price, price, price]
                sum += price[selected]
            } else {
                sum += price
            }
            return false
        })
        return false
    })
    return sum
}
exports.getSum = getSum
const getSumWithDelivery = (zone, itemsData, cart) => {
    const pureSum = (0, exports.getSum)(cart, itemsData)
    let sum = pureSum
    const minSum = config_1.zoneDeliveryInfo[zone].minSum
    const deliveryPrice = config_1.zoneDeliveryInfo[zone].deliveryPrice
    const freeDeliverySum = config_1.zoneDeliveryInfo[zone].freeDelivery
    if (pureSum < minSum) {
        return false
    }
    if (pureSum <= freeDeliverySum) {
        sum += deliveryPrice
    }
    return sum
}
exports.getSumWithDelivery = getSumWithDelivery
// # sourceMappingURL=functions.js.map
