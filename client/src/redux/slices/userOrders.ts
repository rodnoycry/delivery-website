import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ServerOrder } from '@/interfaces'

const userOrdersInitialState: ServerOrder[] = []

export const userOrdersSlice = createSlice({
    name: 'userOrdersStore',
    initialState: userOrdersInitialState,
    reducers: {
        setUserOrders: (state, action: PayloadAction<ServerOrder[]>) => {
            state.splice(0, state.length)
            action.payload.forEach((order) => {
                state.push(order)
            })
        },
    },
})
