import axios, { AxiosError } from 'axios'
import { ServerOrder, OrderErrorData } from '@/interfaces'
import { domain } from './config'

interface OrderError {
    errorType: 'Sum Error' | 'Uncomplete Data'
    uncompleteData?: string[]
}

interface NewOrderData {
    order: ServerOrder
    idToken?: string
}

export const sendOrderToServer = async (
    newOrderData: NewOrderData,
    successCallback: () => void,
    errorCallback: (error: AxiosError<OrderErrorData | null>) => void
): Promise<string | undefined> => {
    try {
        const response = await axios.post(
            `${domain}/api/orders/add`,
            newOrderData,
            {
                withCredentials: true,
            }
        )
        const orderId = response.data.orderId
        successCallback()
        return orderId
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<OrderErrorData | null>
            console.error(error)
            errorCallback(axiosError)
        } else {
            console.error(error)
            throw new Error(`sendOrderToServer unknown error`)
        }
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

export const getUserOrders = async (
    idToken: string
): Promise<ServerOrder[]> => {
    try {
        const response = await axios.post(
            `${domain}/api/orders/get-user-orders`,
            {
                idToken,
            }
        )
        return response.data
    } catch (error: any) {
        console.error(error.message)
        throw new Error()
    }
}
