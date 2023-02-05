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
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.push(...action.payload)
        },
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            // Inserts new item near the same item if such item already exists
            const newItem = action.payload
            let lastIndex = -1
            for (let i = state.length - 1; i >= 0; i--) {
                if (
                    state[i].id === newItem.id &&
                    state[i].selected === newItem.selected
                ) {
                    lastIndex = i
                    break
                }
            }
            state.splice(lastIndex + 1, 0, newItem)
        },
        removeCartItem: (state, action: PayloadAction<CartItem>) => {
            // Remove last specifies item that exists in cart
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
