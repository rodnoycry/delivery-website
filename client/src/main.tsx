import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { store } from './redux/store'
import { App } from './App'

const rootNode = document.getElementById('app')

if (rootNode != null) {
    createRoot(rootNode).render(
        <CookiesProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </CookiesProvider>
    )
}
