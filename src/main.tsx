import React from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { App } from './App'

const rootNode = document.getElementById('app')

if (rootNode != null) {
    createRoot(rootNode).render(
        <Provider store={store}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </Provider>
    )
}
