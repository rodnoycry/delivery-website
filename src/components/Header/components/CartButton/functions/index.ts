import { CartItem } from '@/redux/slices/cartSlice'
import { itemsData } from '@/mockData/items'

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
