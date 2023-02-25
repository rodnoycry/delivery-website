import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState as StoreState } from '@/redux/store'
import { ItemData } from '@/interfaces'
import CartImg from './images/Cart.png'
import styles from './CartButton.module.css'
import { getItemsData, getSum } from '@/functions'

export const CartButton: FC = () => {
    const [itemsQty, setItemsQty] = useState(0)
    const [itemsData, setItemsData] = useState<ItemData[]>([])
    const [sum, setSum] = useState(0)
    const cart = useSelector((state: StoreState) => state.cartState)

    useEffect(() => {
        if (cart) {
            setItemsQty(cart?.length)
            getItemsData(cart, setItemsData).catch(console.error)
        }
    }, [cart])

    useEffect(() => {
        if (itemsData) {
            setSum(cart ? getSum(cart, itemsData) : 0)
        }
    }, [itemsData])

    const updateSumAndQty = (): void => {
        setItemsQty(cart?.length)
        setSum(cart ? getSum(cart, itemsData) : 0)
    }
    return (
        <Link to="/cart">
            <button
                className={styles.cart}
                onClick={() => {
                    window.scrollTo(0, 0)
                    updateSumAndQty()
                }}
            >
                <div className={styles.cartCounter}>
                    <img className={styles.cart} src={CartImg} />
                    <span className={styles.cartCounter}>{itemsQty}</span>
                </div>
                <p className={styles.cart}>
                    <span>{sum}</span>
                    {` руб.`}
                </p>
            </button>
        </Link>
    )
}
