import { ItemData } from '@/redux/slices/itemsDataSlice'

export interface CartItemData extends ItemData {
    selected: number | boolean
    qtyInCart: number
}
