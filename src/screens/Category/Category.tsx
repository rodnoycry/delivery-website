import React from 'react'
import type { FC } from 'react'
import { itemsData } from './mockData/pizza'

interface Props {
    path: string
    style?: object
}

export const Category: FC<Props> = ({ path, style }) => {
    return <div>Category</div>
}
