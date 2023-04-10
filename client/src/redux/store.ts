import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'
import { CartItem, ServerItemData, ServerOrder, UserData } from '@/interfaces'
import { itemsDataSlice } from './slices/itemsDataSlice'
import { itemsStatesSlice, ItemState } from './slices/itemsStatesSlice'
import { inputStatesSlice, InputStates } from './slices/inputStatesSlice'
import { localOrdersDataSlice } from './slices/localOrdersDataSlice'
import { windowsStatesSlice } from './slices/windowsSlice'
import type { WindowName } from './slices/windowsSlice'
import { userStateSlice } from './slices/userSlice'
import { userOrdersSlice } from './slices/userOrders'
import { syncLocalStorageMiddleware } from './middleware'

export interface ReduxStore {
    cartStore: CartItem[]
    itemsDataStore: ServerItemData[]
    itemsStatesStore: Record<string, ItemState>
    inputStatesStore: InputStates
    localOrdersDataStore: ServerOrder[]
    windowsStatesStore: Record<WindowName, boolean>
    userStateStore: UserData
    userOrdersStore: ServerOrder[]
}

export const {
    setCart,
    addCartItem,
    removeCartItem,
    deleteCartItem,
    resetCart,
} = cartSlice.actions
export const { updateItemState } = itemsStatesSlice.actions
export const { setItemsData } = itemsDataSlice.actions
export const { updateInputStates } = inputStatesSlice.actions
export const { setLocalOrdersData, addLocalOrderData } =
    localOrdersDataSlice.actions
export const { updateLoginWindowState } = windowsStatesSlice.actions
export const {
    updateUserState,
    updateUserName,
    updateUserPhone,
    clearUserData,
} = userStateSlice.actions
export const { setUserOrders } = userOrdersSlice.actions

export const store = configureStore({
    reducer: {
        cartStore: cartSlice.reducer,
        itemsDataStore: itemsDataSlice.reducer,
        itemsStatesStore: itemsStatesSlice.reducer,
        inputStatesStore: inputStatesSlice.reducer,
        localOrdersDataStore: localOrdersDataSlice.reducer,
        windowsStatesStore: windowsStatesSlice.reducer,
        userStateStore: userStateSlice.reducer,
        userOrdersStore: userOrdersSlice.reducer,
    },
    middleware: (gDM) => gDM().concat(syncLocalStorageMiddleware),
})
