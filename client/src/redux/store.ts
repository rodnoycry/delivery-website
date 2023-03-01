import { configureStore } from '@reduxjs/toolkit'
import { CartItem, cartSlice } from './slices/cartSlice'
import { itemDataSlice } from './slices/itemsDataSlice'
import { ItemData, ServerOrder } from '@/interfaces'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'
import { orderSlice, Order } from './slices/orderSlice'
import { localOrdersDataSlice } from './slices/localOrdersDataSlice' // DEMO
import { syncCookieMiddleware } from './middleware'

export interface RootState {
    cartState: CartItem[]
    itemDataState: ItemData[]
    itemsStates: Record<string, ItemState>
    orderState: Order
    // DEMO ONLY
    localOrdersDataState: ServerOrder[]
}

export const {
    setCart,
    addCartItem,
    removeCartItem,
    deleteCartItem,
    resetCart,
} = cartSlice.actions
export const { updateItemState } = itemsStatesSlice.actions
export const { updateOrder } = orderSlice.actions
// DEMO ONLY
export const { setLocalOrdersData, addLocalOrderData } =
    localOrdersDataSlice.actions

export const store = configureStore({
    reducer: {
        cartState: cartSlice.reducer,
        itemDataState: itemDataSlice.reducer,
        itemsStates: itemsStatesSlice.reducer,
        orderState: orderSlice.reducer,
        // DEMO ONLY
        localOrdersDataState: localOrdersDataSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(syncCookieMiddleware),
})
