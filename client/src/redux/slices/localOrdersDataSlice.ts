// ONLY FOR DEMONSTRATION PURPOSES
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ServerOrder } from '@/interfaces'

// ONLY FOR DEMONSTRATION PURPOSES
const localOrdersDataInitialState: ServerOrder[] = []

// ONLY FOR DEMONSTRATION PURPOSES
export const localOrdersDataSlice = createSlice({
    name: 'localOrdersDataStore',
    initialState: localOrdersDataInitialState,
    reducers: {
        setLocalOrdersData: (state, action: PayloadAction<ServerOrder[]>) => {
            action.payload.forEach((adminOrder) => {
                state.push(adminOrder)
            })
        },
        addLocalOrderData: (state, action: PayloadAction<ServerOrder>) => {
            state.push(action.payload)
        },
    },
})
