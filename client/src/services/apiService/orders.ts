import axios from 'axios'
import { ServerOrder } from '@/interfaces'
import { domain } from './config'

interface OrderError {
    errorType: 'Sum Error' | 'Uncomplete Data'
    uncompleteData?: string[]
}

export const sendOrderToServer = async (
    data: ServerOrder
): Promise<number | OrderError> => {
    try {
        const response = await axios.post(`${domain}/api/order`, data)
        return response.status
    } catch (error: any) {
        return error.response.data as OrderError
    }
}

export const getOrders = async (
    idToken: string
): Promise<ServerOrder[] | undefined> => {
    try {
        // console.log('started request')
        const response = await axios.post(`${domain}/api/orders/get`, {
            idToken,
        })
        return response.data
    } catch (error: any) {
        console.error(error.message)
        throw new Error()
    }
}
