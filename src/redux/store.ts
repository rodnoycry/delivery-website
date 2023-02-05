import { configureStore } from '@reduxjs/toolkit'
import { ItemData, itemDataSlice } from './slices/itemsDataSlice'
import { CartItem, cartSlice } from './slices/cartSlice'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'
import { syncCookieMiddleware } from './middleware'

export interface RootState {
    itemDataState: ItemData[]
    cartState: CartItem[]
    itemsStates: Record<number, ItemState>
}

export const { setCart, addCartItem, removeCartItem } = cartSlice.actions
export const { updateItemState } = itemsStatesSlice.actions

export const store = configureStore({
    reducer: {
        itemDataState: itemDataSlice.reducer,
        cartState: cartSlice.reducer,
        itemsStates: itemsStatesSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(syncCookieMiddleware),
})
