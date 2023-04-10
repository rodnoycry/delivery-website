import { User } from 'firebase/auth'
import {
    updateUserState,
    updateInputStates,
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
        // Prepare for redux input states sending with user phone and name
        // if phone input state is empty or name input is empty
        if (
            !fetchedUserData.inputStates?.PhoneInput?.value &&
            fetchedUserData.phone
        ) {
            fetchedUserData.inputStates.PhoneInput.value = fetchedUserData.phone
        }
        if (
            !fetchedUserData.inputStates?.NameInput?.value &&
            fetchedUserData.displayName
        ) {
            fetchedUserData.inputStates.NameInput.value =
                fetchedUserData.displayName
        }
        // Update local input states with user input states
        if (!inputStatesParsed) {
            dispatch(updateInputStates(fetchedUserData.inputStates))
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
