import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: string
    selected: number | boolean
}

const cartInitialState: CartItem[] = []

export const cartSlice = createSlice({
    name: 'cartState',
    initialState: cartInitialState,
    reducers: {
        resetCart: (state) => {
            state.splice(0, state.length)
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.push(...action.payload)
        },
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            // Inserts new item near the same item if such item already exists,
            // otherwise push new
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
            // Remove last specified item that exists in cart
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
        deleteCartItem: (state, action: PayloadAction<CartItem>) => {
            // Deletes all such objects in cart
            const item = action.payload
            for (let i = state.length - 1; i >= 0; i--) {
                if (
                    state[i].id === item.id &&
                    state[i].selected === item.selected
                ) {
                    state.splice(i, 1)
                }
            }
        },
    },
})
