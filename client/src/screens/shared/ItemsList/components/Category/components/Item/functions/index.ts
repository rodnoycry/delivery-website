import { CartItem } from '@/redux/slices/cartSlice'

export const getPrice = (
    type: string,
    price: number | number[],
    selected: number
): number => {
    switch (type) {
        case 'pizza' || 'wok':
            if (!Array.isArray(price)) {
                throw new Error(
                    `Item has ${type} type but don't have price selection, current price arg: ${price.toString()}`
                )
            } else {
                return price[selected]
            }
        default:
            return price as number
    }
}

export const getQty = (
    cart: CartItem[],
    id: string,
    selected: number
): number => {
    return cart.filter((item) => item.id === id && item.selected === selected)
        .length
}
