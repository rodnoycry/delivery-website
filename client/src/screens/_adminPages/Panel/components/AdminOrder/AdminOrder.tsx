import React from 'react'
import type { FC } from 'react'
import { User } from 'firebase/auth'
import { ItemData, ServerOrder } from '@/interfaces'
import { Order } from '@/components/shared/Order'

interface Props {
    user: User | null
    showIsActive: boolean
    order: ServerOrder
    itemsData: ItemData[]
}

export const AdminOrder: FC<Props> = ({
    user,
    showIsActive,
    order,
    itemsData,
}) => {
    return (
        <Order
            isAdminMode={true}
            user={user}
            showIsActive={showIsActive}
            order={order}
            itemsData={itemsData}
        />
    )
}
