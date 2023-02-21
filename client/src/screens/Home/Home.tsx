import React from 'react'
import type { FC } from 'react'
import { Promo } from './components/Promo'
import { Categories } from './components/Categories'

interface Props {
    search: string
    style?: object
}

export const Home: FC<Props> = ({ search, style }) => {
    const appearanceStyle = search ? { display: 'none' } : {}
    return (
        <div style={{ ...style, ...appearanceStyle }}>
            <Promo />
            <Categories style={{ marginTop: '30px' }} />
        </div>
    )
}
