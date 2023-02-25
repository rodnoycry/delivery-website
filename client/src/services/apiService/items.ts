import axios from 'axios'
import { ServerItemData } from '@/interfaces'
import { domain } from './config'

export const getItems = async (
    type: string | null = null,
    search: string | null = null,
    ids: string[] | null = null
): Promise<ServerItemData[]> => {
    const data = {
        type,
        search,
        ids,
    }
    try {
        // console.log('started request')
        const response = await axios.post(`${domain}/api/items/get`, data)
        return response.data
    } catch (error: any) {
        console.log(error.message)
        return []
    }
}
