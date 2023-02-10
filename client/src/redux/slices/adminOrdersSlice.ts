// ONLY FOR DEMONSTRATION PURPOSES
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ItemData } from './itemsDataSlice'

// ONLY FOR DEMONSTRATION PURPOSES
export interface AdminOrder {
    time: string
    sum: number
    cart: ItemData[] | undefined
    phone: string | undefined
    name: string | undefined
    deliveryType: string | undefined
    street: string | undefined
    house: string | undefined
    personQty: string | undefined
    deliveryTime: string | undefined
    paymentMethod: string | undefined
    comment: string | undefined
}

// ONLY FOR DEMONSTRATION PURPOSES
const adminOrdersInitialState: AdminOrder[] = []

// ONLY FOR DEMONSTRATION PURPOSES
export const adminOrdersSlice = createSlice({
    name: 'adminOrdersState',
    initialState: adminOrdersInitialState,
    reducers: {
        setAdminOrders: (state, action: PayloadAction<AdminOrder[]>) => {
            action.payload.forEach((adminOrder) => {
                state.push(adminOrder)
            })
        },
        addAdminOrder: (state, action: PayloadAction<AdminOrder>) => {
            state.push(action.payload)
        },
    },
})
