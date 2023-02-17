import React from 'react'
import type { FC } from 'react'
import { CartItemData } from '../../../../../../interfaces'
import styles from './Item.module.css'
import { selectorsData } from '../../../../../../config'

interface Props {
    style?: object
}
export const Item: FC<CartItemData> = ({
    id,
    type,
    image,
    name,
    qty,
    qtyInCart,
    price,
    selected,
}) => {
    return (
        <div className={styles.item}>
            <div className={styles.imageContainer}>
                <img className={styles.item} src={image} />
            </div>
            <div className={styles.leftTextContainer}>
                <h2 className={styles.leftText}>
                    {name}{' '}
                    {['pizza', 'wok'].includes(type)
                        ? `(${selectorsData[type][selected].title})`
                        : ``}
                </h2>
                <h3 className={styles.leftText}>
                    {qtyInCart} шт. x{' '}
                    {['pizza', 'wok'].includes(type) ? price[selected] : price}{' '}
                    ₽
                </h3>
            </div>
            <h1 className={styles.price}>
                {['pizza', 'wok'].includes(type)
                    ? price[selected] * qtyInCart
                    : price * qtyInCart}{' '}
                ₽
            </h1>
        </div>
    )
}
