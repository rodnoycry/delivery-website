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
                <div></div>
                <h4 className={styles.tableHeader}>Название</h4>
                <h4 className={styles.tableHeader}>Цена</h4>
                <h4
                    className={styles.tableHeader}
                    style={{
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        padding: `0 15px`,
                    }}
                >
                    Количество
                </h4>
                <h4
                    className={styles.tableHeader}
                    style={{
                        paddingLeft: `10%`,
                    }}
                >
                    Сумма
                </h4>
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
