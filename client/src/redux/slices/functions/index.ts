import { ItemData } from '../itemsDataSlice'
import { itemsData } from '@/mockData/items'

export const getItemData = (): ItemData[] => {
    return itemsData
}
