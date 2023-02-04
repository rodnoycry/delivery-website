import { configureStore } from '@reduxjs/toolkit'
import { CartItem, cartSlice } from './slices/cartSlice'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'

export interface RootState {
    cartState: CartItem[]
    itemsStates: Record<number, ItemState>
}

export const { addCartItem, removeCartItem } = cartSlice.actions
export const { updateItemState } = itemsStatesSlice.actions

export const store = configureStore({
    reducer: {
        cartState: cartSlice.reducer,
        itemsStates: itemsStatesSlice.reducer,
    },
})
