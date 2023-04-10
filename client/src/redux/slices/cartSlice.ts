import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '@/interfaces'
import { updateUserCart } from '@/services/apiService'

const cartInitialState: CartItem[] = []

export const cartSlice = createSlice({
    name: 'cartStore',
    initialState: cartInitialState,
    reducers: {
        resetCart: (state, action: PayloadAction<{ idToken?: string }>) => {
            state.splice(0, state.length)
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.length = 0
            state.push(...action.payload)
        },
        addCartItem: (
            state,
            action: PayloadAction<{ item: CartItem; idToken?: string }>
        ) => {
            // Inserts new item near the same item if such item already exists,
            // otherwise push new
            const { item, idToken } = action.payload
            let lastIndex = -1
            for (let i = state.length - 1; i >= 0; i--) {
                if (
                    state[i].id === item.id &&
                    state[i].selected === item.selected
                ) {
                    lastIndex = i
                    break
                }
            }
            state.splice(lastIndex + 1, 0, item)
            const cart = state
            if (idToken) {
                updateUserCart(idToken, cart).catch(console.error)
            }
        },
        removeCartItem: (
            state,
            action: PayloadAction<{ item: CartItem; idToken?: string }>
        ) => {
            // Remove last specified item that exists in cart
            const idToken = action.payload.idToken
            const { id, selected } = action.payload.item
            const fittingItmesList = state.find(
                (stateItem) =>
                    stateItem.id === id && stateItem.selected === selected
            )
            if (fittingItmesList === undefined) {
                return
            }
            const itemIndex = state.lastIndexOf(fittingItmesList)
            state.splice(itemIndex, 1)
            const cart = state
            if (idToken) {
                updateUserCart(idToken, cart).catch(console.error)
            }
        },
        deleteCartItem: (
            state,
            action: PayloadAction<{ item: CartItem; idToken?: string }>
        ) => {
            // Deletes all such objects in cart
            const { item, idToken } = action.payload
            for (let i = state.length - 1; i >= 0; i--) {
                if (
                    state[i].id === item.id &&
                    state[i].selected === item.selected
                ) {
                    state.splice(i, 1)
                }
            }
            const cart = state
            if (idToken) {
                updateUserCart(idToken, cart).catch(console.error)
            }
        },
    },
})
