import { CartItemData } from '../interfaces'
import { ItemData } from '@/redux/slices/itemsDataSlice'
import { CartItem } from '@/redux/slices/cartSlice'

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
