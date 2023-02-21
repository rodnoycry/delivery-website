import React from 'react'
import type { FC } from 'react'
import { ItemsList } from '@/screens/shared/ItemsList'

interface Props {
    search: string
    style?: object
}

export const UserItemsList: FC<Props> = ({ search, style }) => {
    return <ItemsList mode={'user'} search={search} style={style} />
}
