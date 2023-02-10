import { configureStore } from '@reduxjs/toolkit'
import { CartItem, cartSlice } from './slices/cartSlice'
import { ItemData, itemDataSlice } from './slices/itemsDataSlice'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'
import { orderSlice, Order } from './slices/orderSlice'
import { syncCookieMiddleware } from './middleware'

export interface RootState {
    cartState: CartItem[]
    itemDataState: ItemData[]
    itemsStates: Record<number, ItemState>
    orderState: Order
}

export const { setCart, addCartItem, removeCartItem, deleteCartItem } =
    cartSlice.actions
export const { updateItemState } = itemsStatesSlice.actions
export const { updateOrder } = orderSlice.actions

export const store = configureStore({
    reducer: {
        cartState: cartSlice.reducer,
        itemDataState: itemDataSlice.reducer,
        itemsStates: itemsStatesSlice.reducer,
        orderState: orderSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(syncCookieMiddleware),
})
