import React from 'react'
import type { FC } from 'react'
import { ItemsList } from '@/screens/ItemsList'
import { CategoryName } from '@/interfaces'

interface Props {
    search: string
    category: CategoryName | 'searchResults'
    style?: object
}

export const UserItemsList: FC<Props> = ({ search, category, style }) => {
    return (
        <ItemsList
            isAdmin={false}
            search={search}
            category={category}
            style={style}
        />
    )
}
