import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '@/interfaces'

const userStateInitialState: UserData = {
    isLoggedIn: false,
}

export const userStateSlice = createSlice({
    name: 'userState',
    initialState: userStateInitialState,
    reducers: {
        updateUserState: (state, action: PayloadAction<Partial<UserData>>) => {
            const payloadKeys: Array<keyof UserData> = Object.keys(
                action.payload
            ) as Array<keyof UserData>
            payloadKeys.forEach((key) => {
                if (key === 'isLoggedIn') {
                    state[key] = !!action.payload[key]
                } else if (key !== 'ordersData' && key !== 'inputStates') {
                    state[key] = action.payload[key]
                } else if (key !== 'ordersData') {
                    state[key] = action.payload[key]
                } else {
                    state[key] = action.payload[key]
                }
            })
        },
        updateUserName: (state, action: PayloadAction<string>) => {
            if (state.inputStates) {
                state.inputStates.NameInput.value = action.payload
            }
        },
        clearUserData: (state) => {
            state.displayName = undefined
            state.inputStates = undefined
            state.email = undefined
            state.ordersData = undefined
            state.phone = undefined
        },
    },
})
