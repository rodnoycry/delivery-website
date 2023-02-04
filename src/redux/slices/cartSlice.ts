import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: number
    selected: number | boolean
}

const cartInitialState: CartItem[] = []

export const cartSlice = createSlice({
    name: 'cartState',
    initialState: cartInitialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            state.push(action.payload)
        },
        removeCartItem: (state, action: PayloadAction<CartItem>) => {
            const { id, selected } = action.payload
            const fittingItmesList = state.find(
                (stateItem) =>
                    stateItem.id === id && stateItem.selected === selected
            )
            if (fittingItmesList === undefined) {
                return
            }
            const itemIndex = state.lastIndexOf(fittingItmesList)
            state.splice(itemIndex, 1)
        },
    },
})
