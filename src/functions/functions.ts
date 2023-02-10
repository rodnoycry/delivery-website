import { CartItem } from '@/redux/slices/cartSlice'
import { itemsData } from '@/mockData/items'

import { zoneDeliveryInfo } from '@/config'
import { Order } from '@/redux/slices/orderSlice'

export const getSum = (cart: CartItem[]): number => {
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
                sum += price as number
            }
            return false
        })
        return false
    })
    return sum
}

export const getSumWithDelivery = (
    zone: Order['zone'],
    cart: CartItem[]
): number | false => {
    const pureSum = getSum(cart)
    let sum = pureSum
    const minSum = zoneDeliveryInfo[zone].minSum
    const deliveryPrice = zoneDeliveryInfo[zone].deliveryPrice
    const freeDeliverySum = zoneDeliveryInfo[zone].freeDelivery

    if (pureSum < minSum) {
        return false
    }

    if (pureSum < freeDeliverySum) {
        sum += deliveryPrice
    }
    return sum
}
