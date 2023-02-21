import axios from 'axios'
import { ItemData } from '@/interfaces'
import { domain } from './config'

export const getItems = async (
    type: string | null = null,
    search: string | null = null
): Promise<ItemData[]> => {
    const data = {
        type,
        search,
    }
    try {
        const response = await axios.post(`${domain}/api/items/get`, data)
        return response.data
    } catch (error: any) {
        console.log(error.message)
        return []
    }
}
