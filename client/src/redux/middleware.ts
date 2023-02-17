import { Middleware } from 'redux'

export const syncCookieMiddleware: Middleware =
    (store) => (next) => (action) => {
        const result = next(action)
        const storeState = store.getState()
        const cartState = storeState.cartState
        const orderState = storeState.orderState
        const adminOrdersState = storeState.adminOrdersState

        if (action.type.startsWith('cartState/')) {
            window.localStorage.setItem('cart', JSON.stringify(cartState))
        } else if (action.type.startsWith('orderState/')) {
            window.localStorage.setItem('order', JSON.stringify(orderState))
        } else if (action.type.startsWith('adminOrdersState/')) {
            window.localStorage.setItem(
                'adminOrders',
                JSON.stringify(adminOrdersState)
            )
        }

        return result
    }
