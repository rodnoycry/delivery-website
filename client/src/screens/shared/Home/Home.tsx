import React, { createContext } from 'react'
import type { FC } from 'react'
import { Promo } from './components/Promo'
import { Categories } from './components/Categories'

interface Props {
    isAdmin: boolean
    search: string
    style?: object
}

export const IsAdminContext = createContext<boolean>(false)

export const Home: FC<Props> = ({ isAdmin, search, style }) => {
    const appearanceStyle = search ? { display: 'none' } : {}
    return (
        <IsAdminContext.Provider value={isAdmin}>
            <div style={{ ...style, ...appearanceStyle }}>
                <Promo />
                <Categories style={{ marginTop: '30px' }} />
            </div>
        </IsAdminContext.Provider>
    )
}
