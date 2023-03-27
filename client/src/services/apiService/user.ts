import axios from 'axios'
import { domain } from './config'
import { Order } from '@/redux/slices/orderSlice'
import { DetailedInputData } from '@/interfaces'

const links = {
    getUserDataLink: `${domain}/api/users/get`,
    updateUserInputStates: `${domain}/api/users/update-input-states`,
}

export const getUserData = async (
    idToken: string,
    displayName?: string
): Promise<any> => {
    try {
        const response = await axios.post(
            links.getUserDataLink,
            {
                idToken,
                displayName,
            },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error(`getUserData error`)
    }
}

export const updateUserInputs = async (
    idToken: string,
    inputStates: Order | Record<string, DetailedInputData>
): Promise<void> => {
    try {
        await axios.post(links.updateUserInputStates, { idToken, inputStates })
    } catch (error) {
        console.error(error)
        throw new Error(`updateUserInputs error`)
    }
}
