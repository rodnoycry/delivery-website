import { Middleware } from 'redux'

export const syncCookieMiddleware: Middleware =
    (store) => (next) => (action) => {
        const result = next(action)
        const storeState = store.getState()
        const cartState = storeState.cartState
        const orderState = storeState.orderState
        const localOrdersDataState = storeState.localOrdersDataState

        if (action.type.startsWith('cartState/')) {
            window.localStorage.setItem('cart', JSON.stringify(cartState))
        } else if (action.type.startsWith('orderState/')) {
            window.localStorage.setItem('order', JSON.stringify(orderState))
        } else if (action.type.startsWith('localOrdersDataState/')) {
            window.localStorage.setItem(
                'localOrdersData',
                JSON.stringify(localOrdersDataState)
            )
        }

        return result
    }
