// ONLY FOR DEMONSTRATION PURPOSES
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from './cartSlice'

// ONLY FOR DEMONSTRATION PURPOSES
export interface CompleteOrder {
    // Common data
    time: string
    sum: number
    zone?: string
    cart: CartItem[] | undefined
    // Inputs and selects data
    phone: string | undefined
    name: string | undefined
    deliveryType: string | undefined
    locality: string | undefined
    street: string | undefined
    house: string | undefined
    apartment: string | undefined
    entrance: string | undefined
    intercom: string | undefined
    // Part 2
    personQty: string | undefined
    deliveryTimeType: string | undefined
    deliveryDay: string | undefined
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
