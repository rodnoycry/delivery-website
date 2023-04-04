import { User } from 'firebase/auth'
import {
    updateUserState,
    updateOrder as updateReduxOrder,
    setCart as setReduxCart,
} from '@/redux/store'
import { Dispatch } from '@reduxjs/toolkit'
import { getUserData, getUserCart } from '../apiService'
import { UserData } from '@/interfaces'

export const getUserDataFromServerCSI = async (
    user: User,
    inputStates: string | null | undefined,
    cart: string | null | undefined,
    dispatch: Dispatch
): Promise<void> => {
    try {
        const token = await user.getIdToken()
        const displayName = user?.displayName ? user.displayName : undefined
        let inputStatesParsed
        if (inputStates) {
            inputStatesParsed = JSON.parse(inputStates)
        }
        const userDataToSend: Partial<UserData> = {
            displayName,
            inputStates: inputStatesParsed,
        }
        const fetchedUserData = await getUserData(token, userDataToSend)
        dispatch(
            updateUserState({
                isLoggedIn: true,
                ...fetchedUserData,
            })
        )
        // Update local input states with user input states
        console.log(`inputStates:`, !!inputStates)
        console.log(fetchedUserData.inputStates)
        if (!inputStates) {
            dispatch(updateReduxOrder(fetchedUserData.inputStates))
        }
        if (!cart) {
            const cart = await getUserCart(token)
            dispatch(setReduxCart(cart))
        }
        // Update local cart with db user data
    } catch (error) {
        console.error(error)
        throw new Error(
            `services/CSI/getUserDataFromServerCSI: getUserDataFromServer error`
        )
    }
}
