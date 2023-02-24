import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { CartItemData } from '@/interfaces'
import styles from './Item.module.css'
import { selectorsData } from '@/config'

interface Props extends CartItemData {
    style?: CSSProperties
}
export const Item: FC<Props> = ({
    id,
    type,
    image,
    name,
    qty,
    qtyInCart,
    price,
    selected,
    style,
}) => {
    return (
        <div className={styles.item} style={style}>
            <div className={styles.imageContainer}>
                <img className={styles.item} src={image} />
            </div>
            <div className={styles.leftTextContainer}>
                <h2 className={styles.leftText}>
                    {name}{' '}
                    {['pizza', 'wok'].includes(type)
                        ? `(${
                              selectorsData[type as keyof typeof selectorsData][
                                  selected as number
                              ].title
                          })`
                        : ``}
                </h2>
                <h3 className={styles.leftText}>
                    {qtyInCart} шт. x{' '}
                    {['pizza', 'wok'].includes(type) && Array.isArray(price)
                        ? price[selected as number]
                        : price}{' '}
                    ₽
                </h3>
            </div>
            <h1 className={styles.price}>
                {['pizza', 'wok'].includes(type) && Array.isArray(price)
                    ? price[selected as number] * qtyInCart
                    : (price as number) * qtyInCart}{' '}
                ₽
            </h1>
        </div>
    )
}
