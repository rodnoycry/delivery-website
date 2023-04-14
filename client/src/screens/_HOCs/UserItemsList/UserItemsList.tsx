import React from 'react'
import type { FC } from 'react'
import { ItemsList } from '@/screens/ItemsList'

interface Props {
    search: string
    style?: object
}

export const UserItemsList: FC<Props> = ({ search, style }) => {
    return <ItemsList isAdmin={false} search={search} style={style} />
}
