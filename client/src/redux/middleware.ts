import { Middleware } from 'redux'
import { ReduxStore } from './store'

export const syncLocalStorageMiddleware: Middleware =
    (store) => (next) => (action) => {
        const result = next(action)
        const storeState: ReduxStore = store.getState()
        const cartState = storeState.cartStore
        const inputStates = storeState.inputStatesStore
        const localOrdersDataState = storeState.localOrdersDataStore

        if (action.type.startsWith('cartStore/')) {
            window.localStorage.setItem('cart', JSON.stringify(cartState))
        } else if (action.type.startsWith('inputStatesStore/')) {
            window.localStorage.setItem(
                'inputStates',
                JSON.stringify(inputStates)
            )
        } else if (action.type.startsWith('localOrdersDataStore/')) {
            window.localStorage.setItem(
                'localOrdersData',
                JSON.stringify(localOrdersDataState)
            )
        }

        return result
    }
