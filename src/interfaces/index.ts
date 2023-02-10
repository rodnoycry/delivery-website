import { ItemData } from '@/redux/slices/itemsDataSlice'

export interface CartItemData extends ItemData {
    selected: number | boolean
    qtyInCart: number
}

// interface Item {
//     id: number
//     type: string
//     image: string
//     name: string
//     description: string
//     isNew: boolean
//     spiciness: number
//     price: number | number[]
// }

// export { Item }
