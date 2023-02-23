import React from 'react'
import type { FC } from 'react'
import { ItemsList } from '@/screens/shared/ItemsList'

export const AdminItemsList: FC = () => {
    return <ItemsList isAdmin={true} search={''} />
}
