import axios, { AxiosError } from 'axios'
import { DetailedOrder } from '@/interfaces'

interface TestData {
    name: string
    email: string
}

const domain = 'http://localhost:3000'

export const sendDataToServer = (data: TestData): TestData | any => {
    axios
        .post(`${domain}/api/test`, data)
        .then((response) => {
            // handle success
            console.log(response)
            return response
        })
        .catch((error) => {
            // handle error
            console.log(error)
            return error.message
        })
}

interface OrderError {
    errorType: 'Sum Error' | 'Uncomplete Data'
    uncompleteData?: string[]
}

export const sendOrderAndCartToServer = async (
    data: DetailedOrder
): Promise<number | OrderError> => {
    try {
        const response = await axios.post(`${domain}/api/order`, data)
        return response.status
    } catch (error: any) {
        return error.response.data as OrderError
    }
}

export const getIsAdminFromServer = async (data: {
    idToken: string
}): Promise<boolean> => {
    try {
        const response = await axios.post(`${domain}/api/admin`, data)
        return response.data.isAdmin
    } catch (error: any) {
        console.log(error.message)
        return false
    }
}
