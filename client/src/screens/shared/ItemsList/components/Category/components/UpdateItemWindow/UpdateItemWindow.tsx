import React from 'react'
import type { FC } from 'react'
import { ItemData } from '@/interfaces'
import styles from './UpdateItemWindow.module.css'

interface Props {
    itemData: ItemData
    isAddingItem: boolean
    isEditingItem: boolean
}

export const UpdateItemWindow: FC<Props> = ({
    itemData,
    isAddingItem,
    isEditingItem,
}) => {
    return (
        <div>
            <div></div>
        </div>
    )
}
