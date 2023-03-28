import React, { useContext } from 'react'
import type { FC } from 'react'
import { UserContext } from '@/App'
import { CartItemData } from '@/interfaces'
import styles from './TableItem.module.css'
import { useDispatch } from 'react-redux'
import { addCartItem, removeCartItem, deleteCartItem } from '@/redux/store'
import { domain } from '@/services/apiService/config'
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
    const user = useContext(UserContext)
    const dispatch = useDispatch()
    const price = getPrice(type, price_, selected)
    // Methods for buttons to add or remove item
    const addItem = async (): Promise<void> => {
        let idToken
        try {
            if (user) {
                idToken = await user.getIdToken()
            }
        } catch (error) {
            console.error(error)
            throw new Error(`TableItem.tsx: id token retrieve error`)
        }
        dispatch(addCartItem({ item: { id, selected }, idToken }))
    }
    const removeItem = async (): Promise<void> => {
        let idToken
        try {
            if (user) {
                idToken = await user.getIdToken()
            }
        } catch (error) {
            console.error(error)
            throw new Error(`TableItem.tsx: id token retrieve error`)
        }
        dispatch(removeCartItem({ item: { id, selected }, idToken }))
    }
    const deleteItem = async (): Promise<void> => {
        let idToken
        try {
            if (user) {
                idToken = await user.getIdToken()
            }
        } catch (error) {
            console.error(error)
            throw new Error(`TableItem.tsx: id token retrieve error`)
        }
        dispatch(deleteCartItem({ item: { id, selected }, idToken }))
    }
    return (
        <li className={styles.item}>
            <div
                className={styles.imageContainer}
                // style={{ width: 1200 * 0.1 }}
            >
                <div className={styles.image}>
                    <img className={styles.item} src={`${domain}${image}`} />
                </div>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.name}>{name}</h1>
                <h4 className={styles.secondaryLabel}>
                    {type === 'wok' && !name.includes('WOK')
                        ? ''
                        : getSecondaryLabel(type, selected, qty)}
                </h4>
            </div>
            <h3 className={styles.price}>{price} ₽</h3>
            <div className={styles.counterContainer}>
                <Counter
                    qty={qtyInCart}
                    addItem={() => {
                        addItem().catch(console.error)
                    }}
                    removeItem={() => {
                        removeItem().catch(console.error)
                    }}
                    nonZero
                    style={
                        {
                            // position: 'absolute',
                            // right: '24.5%',
                            // transform: 'translateX(-50%)',
                        }
                    }
                />
            </div>
            <h2 className={styles.sum}>{price * qtyInCart} ₽</h2>
            <img
                className={styles.x}
                src={XImage}
                onClick={() => {
                    deleteItem().catch(console.error)
                }}
            />
        </li>
    )
}
