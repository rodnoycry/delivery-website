import React from 'react'
import type { FC } from 'react'
import styles from './CartTable.module.css'
import { CartItemData } from '../../interfaces'
import { TableItem } from './components/TableItem'

interface Props {
    cartItemsData: CartItemData[]
    tableSize: [string, string, string, string]
}

export const CartTable: FC<Props> = ({ cartItemsData, tableSize }) => {
    return (
        <div className={styles.cartTable}>
            <div className={styles.tableHeader}>
                <h4 style={{ marginLeft: tableSize[0] }}>Название</h4>
                <h4 style={{ marginLeft: tableSize[1] }}>Цена</h4>
                <h4 style={{ marginLeft: tableSize[2] }}>Количество</h4>
                <h4 style={{ marginLeft: tableSize[3] }}>Сумма</h4>
            </div>
            <ul>
                {cartItemsData.map((itemData) => {
                    return (
                        <TableItem
                            key={`${
                                itemData.id
                            }${itemData.selected.toString()}`}
                            {...itemData}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
