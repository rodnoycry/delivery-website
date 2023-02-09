import { Middleware } from 'redux'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const syncCookieMiddleware: Middleware =
    (store) => (next) => (action) => {
        const result = next(action)
        const storeState = store.getState()
        const cartState = storeState.cartState
        const orderState = storeState.orderState

        if (action.type.startsWith('cartState/')) {
            cookies.set('cart', cartState)
        } else if (action.type.startsWith('orderState/')) {
            cookies.set('order', orderState)
        }

        return result
    }
