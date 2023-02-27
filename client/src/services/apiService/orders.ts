import axios from 'axios'
import { DetailedOrder } from '@/interfaces'
import { domain } from './config'

interface OrderError {
    errorType: 'Sum Error' | 'Uncomplete Data'
    uncompleteData?: string[]
}

export const sendOrderToServer = async (
    data: DetailedOrder
): Promise<number | OrderError> => {
    try {
        const response = await axios.post(`${domain}/api/order`, data)
        return response.status
    } catch (error: any) {
        return error.response.data as OrderError
    }
}
