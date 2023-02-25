import { configureStore } from '@reduxjs/toolkit'
import { CartItem, cartSlice } from './slices/cartSlice'
import { itemDataSlice } from './slices/itemsDataSlice'
import { ItemData } from '@/interfaces'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'
import { orderSlice, Order } from './slices/orderSlice'
import { CompleteOrder, adminOrdersSlice } from './slices/adminOrdersSlice' // DEMO
import { syncCookieMiddleware } from './middleware'

export interface RootState {
    cartState: CartItem[]
    itemDataState: ItemData[]
    itemsStates: Record<string, ItemState>
    orderState: Order
    // DEMO ONLY
    adminOrdersState: CompleteOrder[]
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
export const { setAdminOrders, addAdminOrder } = adminOrdersSlice.actions

export const store = configureStore({
    reducer: {
        cartState: cartSlice.reducer,
        itemDataState: itemDataSlice.reducer,
        itemsStates: itemsStatesSlice.reducer,
        orderState: orderSlice.reducer,
        // DEMO ONLY
        adminOrdersState: adminOrdersSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(syncCookieMiddleware),
})
