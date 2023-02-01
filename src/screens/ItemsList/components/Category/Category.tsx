import React from 'react'
import type { FC } from 'react'
import styles from './Category.module.css'
import { useSelector } from 'react-redux'
import { State as ReduxState } from '@/redux/store'
import { Item } from './components/Item'

interface ItemData {
    id: number
    type: string
    image: string
    name: string
    description: string
    isNew: boolean
    spiciness: number
    price: number | number[]
}

interface Props {
    title: string
    itemsData: ItemData[]
    style?: object
}

export const Category: FC<Props> = ({ title, itemsData, style }) => {
    const itemsStates = useSelector((state: ReduxState) => state.itemsStates)
    console.log(itemsStates)
    return (
        <div className={styles.category}>
            <h1 className={styles.category}>{title}</h1>
            <ul className={styles.category}>
                {itemsData.map((itemData) => {
                    const selected =
                        itemData.id in itemsStates
                            ? itemsStates[itemData.id].selected
                            : false
                    console.log(`>Category >selected = ${selected.toString()}`)
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
