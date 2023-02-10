import React from 'react'
import type { FC } from 'react'
import { Promo } from './components/Promo'
import { Categories } from './components/Categories'

interface Props {
    style?: object
}

export const Home: FC<Props> = ({ style }) => {
    return (
        <div style={style}>
            <Promo />
            <Categories style={{ marginTop: '30px' }} />
        </div>
    )
}
