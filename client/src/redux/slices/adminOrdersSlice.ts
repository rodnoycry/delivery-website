// ONLY FOR DEMONSTRATION PURPOSES
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from './cartSlice'

// ONLY FOR DEMONSTRATION PURPOSES
export interface CompleteOrder {
    time: string
    sum: number
    cart: CartItem[] | undefined
    phone: string | undefined
    name: string | undefined
    deliveryType: string | undefined
    street: string | undefined
    house: string | undefined
    personQty: string | undefined
    deliveryTime: string | undefined
    paymentMethod: string | undefined
    hasChange: string | undefined
    comment: string | undefined
}

// ONLY FOR DEMONSTRATION PURPOSES
const adminOrdersInitialState: CompleteOrder[] = []

// ONLY FOR DEMONSTRATION PURPOSES
export const adminOrdersSlice = createSlice({
    name: 'adminOrdersState',
    initialState: adminOrdersInitialState,
    reducers: {
        setAdminOrders: (state, action: PayloadAction<CompleteOrder[]>) => {
            action.payload.forEach((adminOrder) => {
                state.push(adminOrder)
            })
        },
        addAdminOrder: (state, action: PayloadAction<CompleteOrder>) => {
            state.push(action.payload)
        },
    },
})
