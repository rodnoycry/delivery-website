import React from 'react'
import type { FC } from 'react'
import styles from './Category.module.css'
import { useSelector } from 'react-redux'
import { RootState as StoreState } from '@/redux/store'
import { ItemData } from '@/mockData/items/interfaces'
import { Item } from './components/Item'

interface Props {
    title: string
    itemsData: ItemData[]
    style?: object
}

export const Category: FC<Props> = ({ title, itemsData, style }) => {
    const itemsStates = useSelector((state: StoreState) => state.itemsStates)
    return (
        <div className={styles.category} style={style}>
            <h1 className={styles.category}>{title}</h1>
            <ul className={styles.category}>
                {itemsData.map((itemData) => {
                    const selected =
                        itemData.id in itemsStates
                            ? itemsStates[itemData.id].selected
                            : false
                    return (
                        <>
                            <Item
                                key={itemData.id}
                                {...itemData}
                                selected={selected}
                            />
                        </>
                    )
                })}
            </ul>
        </div>
    )
}
