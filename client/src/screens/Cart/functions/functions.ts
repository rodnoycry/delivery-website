import { CartItemData, ItemData } from '@/interfaces'
import { CartItem } from '@/redux/slices/cartSlice'

import { zoneDeliveryInfo } from '@/config'
import { Order } from '@/redux/slices/orderSlice'
import { getSum } from '@/functions'

export const getCartItemsData = (
    itemsData: ItemData[],
    cart: CartItem[]
): CartItemData[] => {
    const cartItemsData: CartItemData[] = []
    cart.forEach((cartItem) => {
        const itemData = itemsData.find(
            (itemData) => itemData.id === cartItem.id
        )
        if (itemData === undefined) {
            throw new Error(
                `Item is in the cart but there is no item whith such id in database: ${cartItem.id}`
            )
        }
        const cartItemIndex = cartItemsData.findIndex(
            (cartItemData) =>
                cartItemData.id === itemData.id &&
                cartItemData.selected === cartItem.selected
        )
        if (cartItemIndex === -1) {
            cartItemsData.push({
                ...itemData,
                selected: cartItem.selected,
                qtyInCart: 1,
            })
        } else {
            cartItemsData[cartItemIndex].qtyInCart += 1
        }
    })
    return cartItemsData
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
