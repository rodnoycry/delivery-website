import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { CartItemData } from '@/interfaces'
import { Zone } from '@/redux/slices/orderSlice'
import styles from './Item.module.css'

interface Props {
    zone: string
    price: number
    style?: CSSProperties
}
export const DeliveryItem: FC<Props> = ({ zone, price, style }) => {
    return (
        <div className={styles.item} style={style}>
            <div className={styles.imageContainer}>
                <img className={styles.item} />
            </div>
            <div className={styles.leftTextContainer}>
                <h2 className={styles.leftText}>Доставка</h2>
                <h3 className={styles.leftText}>{zone}</h3>
            </div>
            <h1 className={styles.price}>
                {price}
                {` `}₽
            </h1>
        </div>
    )
}
