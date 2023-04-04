import axios from 'axios'
import { domain } from './config'
import { Order } from '@/redux/slices/orderSlice'
import { UserData, DetailedInputData, CartItem } from '@/interfaces'

const links = {
    getUserDataLink: `${domain}/api/users/get`,
    createUserDataLink: `${domain}/api/users/create`,
    updateUserData: `${domain}/api/users/update`,
    updateUserInputStates: `${domain}/api/users/update-input-states`,
    getUserCart: `${domain}/api/users/get-cart`,
    updateUserCart: `${domain}/api/users/update-cart`,
}

export const getUserData = async (
    idToken: string,
    userData: Partial<UserData>
): Promise<any> => {
    try {
        const response = await axios.post(
            links.getUserDataLink,
            {
                idToken,
                userData,
            },
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error(`getUserData error`)
    }
}

export const createUserData = async (
    idToken: string,
    userData: UserData,
    allowDuplicate: boolean = false
): Promise<void> => {
    try {
        await axios.post(
            links.createUserDataLink,
            {
                idToken,
                userData,
                allowDuplicate,
            },
            { withCredentials: true }
        )
    } catch (error) {
        console.error(error)
        throw new Error(`api/user.ts: createUserData error`)
    }
}

export const updateUserData = async (
    idToken: string,
    userData: Partial<UserData>
): Promise<void> => {
    try {
        await axios.post(links.updateUserData, { idToken, userData })
    } catch (error) {
        console.error(error)
        throw new Error(`updateUserData error`)
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

export const getUserCart = async (idToken: string): Promise<CartItem[]> => {
    try {
        const response = await axios.post(links.getUserCart, {
            idToken,
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error(`getUserCart error`)
    }
}

export const updateUserCart = async (
    idToken: string,
    cart: CartItem[]
): Promise<void> => {
    try {
        await axios.post(links.updateUserCart, { idToken, cart })
    } catch (error) {
        console.error(error)
        throw new Error(`updateUserCart error`)
    }
}
