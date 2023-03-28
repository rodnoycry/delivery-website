import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'
import { CartItem, ItemData, ServerOrder, UserData } from '@/interfaces'
import { itemDataSlice } from './slices/itemsDataSlice'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'
import { orderSlice, Order } from './slices/orderSlice'
import { localOrdersDataSlice } from './slices/localOrdersDataSlice'
import { windowsStatesSlice } from './slices/windowsSlice'
import type { WindowName } from './slices/windowsSlice'
import { userStateSlice } from './slices/userSlice'
import { syncCookieMiddleware } from './middleware'

export interface RootState {
    cartState: CartItem[]
    itemDataState: ItemData[]
    itemsStates: Record<string, ItemState>
    orderState: Order
    localOrdersDataState: ServerOrder[]
    windowsStates: Record<WindowName, boolean>
    userState: UserData
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
export const { setLocalOrdersData, addLocalOrderData } =
    localOrdersDataSlice.actions
export const { updateLoginWindowState } = windowsStatesSlice.actions
export const { updateUserState } = userStateSlice.actions

export const store = configureStore({
    reducer: {
        cartState: cartSlice.reducer,
        itemDataState: itemDataSlice.reducer,
        itemsStates: itemsStatesSlice.reducer,
        orderState: orderSlice.reducer,
        localOrdersDataState: localOrdersDataSlice.reducer,
        windowsStates: windowsStatesSlice.reducer,
        userState: userStateSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(syncCookieMiddleware),
})
