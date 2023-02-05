import React from 'react'
import type { FC } from 'react'
import { CartItemData } from '../../../../interfaces'
import styles from './TableItem.module.css'
import { useDispatch } from 'react-redux'
import { addCartItem, removeCartItem } from '@/redux/store'
import { getSecondaryLabel, getPrice } from './functions/functions'
import { Counter } from '@/components/shared/Counter'
import XImage from './images/X.png'

export const TableItem: FC<CartItemData> = ({
    id,
    type,
    image,
    name,
    qty,
    qtyInCart,
    price: price_,
    selected,
}) => {
    const dispatch = useDispatch()
    const price = getPrice(type, price_, selected)
    // Methods for buttons to add or remove item
    const addItem = (): void => {
        dispatch(addCartItem({ id, selected }))
    }
    const removeItem = (): void => {
        dispatch(removeCartItem({ id, selected }))
    }
    return (
        <li className={styles.item}>
            <div className={styles.imageContainer}>
                <img className={styles.item} src={image} />
            </div>
            <div className={styles.textContainer}>
                <h1>{name}</h1>
                <h4>{getSecondaryLabel(type, selected, qty)}</h4>
            </div>
            <Counter
                qty={qtyInCart}
                addItem={addItem}
                removeItem={removeItem}
            />
            <h3>{price}₽</h3>
            <h2>{price * qtyInCart}₽</h2>
            <img src={XImage} />
        </li>
    )
}
