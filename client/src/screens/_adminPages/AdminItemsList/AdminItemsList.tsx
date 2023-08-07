import React from 'react'
import type { FC } from 'react'
import { ItemsList } from '@/screens/ItemsList'
import { CategoryName } from '@/interfaces'

interface Props {
    category: CategoryName
}

export const AdminItemsList: FC<Props> = ({ category }) => {
    return <ItemsList isAdmin={true} category={category} search={''} />
}
