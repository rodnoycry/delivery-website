import React from 'react'
import type { FC } from 'react'
import styles from './CartTable.module.css'
import { CartItemData } from '@/interfaces'
import { TableItem } from './components/TableItem'

interface Props {
    cartItemsData: CartItemData[]
}

export const CartTable: FC<Props> = ({ cartItemsData }) => {
    return (
        <div className={styles.cartTable}>
            <div className={styles.tableHeader}>
                <h4 style={{ marginLeft: '10%' }}>Название</h4>
                <div style={{ marginRight: '20%' }} className={styles.headers2}>
                    <h4 style={{ marginRight: 65 }}>Цена</h4>
                    <h4 style={{ marginRight: 65 }}>Количество</h4>
                    <h4>Сумма</h4>
                </div>
            </div>
            <ul className={styles.items}>
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
