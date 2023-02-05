import { Middleware } from 'redux'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const syncCookieMiddleware: Middleware =
    (store) => (next) => (action) => {
        const result = next(action)
        const cartState = store.getState().cartState

        switch (action.type) {
            case 'cartState/addCartItem':
                cookies.set('cart', cartState)
                break
            case 'cartState/removeCartItem':
                cookies.set('cart', cartState)
                break
            default:
                break
        }

        return result
    }
