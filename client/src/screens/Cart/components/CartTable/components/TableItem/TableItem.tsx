import React from 'react'
import type { FC } from 'react'
import { CartItemData } from '@/interfaces'
import styles from './TableItem.module.css'
import { useDispatch } from 'react-redux'
import { addCartItem, removeCartItem, deleteCartItem } from '@/redux/store'
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
            <div className={styles.leftElements}>
                <div
                    className={styles.imageContainer}
                    style={{ width: 1200 * 0.1 }}
                >
                    <div className={styles.image}>
                        <img className={styles.item} src={image} />
                    </div>
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.name}>{name}</h1>
                    <h4 className={styles.secondaryLabel}>
                        {getSecondaryLabel(type, selected, qty)}
                    </h4>
                </div>
            </div>
            <h3 className={styles.price}>{price} ₽</h3>
            <Counter
                qty={qtyInCart}
                addItem={addItem}
                removeItem={removeItem}
                style={{
                    position: 'absolute',
                    right: '24.5%',
                    transform: 'translateX(-50%)',
                }}
            />
            <h2 className={styles.sum}>{price * qtyInCart} ₽</h2>
            <img
                className={styles.x}
                src={XImage}
                onClick={() => dispatch(deleteCartItem({ id, selected }))}
            />
        </li>
    )
}
