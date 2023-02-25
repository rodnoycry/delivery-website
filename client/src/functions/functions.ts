import { CartItem } from '@/redux/slices/cartSlice'
import { ItemData } from '@/interfaces'

import { zoneDeliveryInfo } from '@/config'
import { Order } from '@/redux/slices/orderSlice'
import { getItems } from '@/services/apiService/items'

export const getItemsData = async (
    cart: CartItem[],
    setItemsData: (itemsData: ItemData[]) => void
): Promise<void> => {
    const ids = cart.map((cartItemData) => cartItemData.id)
    const itemsData = await getItems(undefined, undefined, ids)
    setItemsData(itemsData)
}

export const getSum = (cart: CartItem[], itemsData: ItemData[]): number => {
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
    itemsData: ItemData[],
    cart: CartItem[]
): number | false => {
    const pureSum = getSum(cart, itemsData)
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
