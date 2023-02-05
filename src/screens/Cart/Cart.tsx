import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState as StoreState } from '@/redux/store'
import { getCartItemsData } from './functions'
import { CartItemData } from './interfaces'
import styles from './Cart.module.css'
import { CartTable } from './components/CartTable'

export const Cart: FC = () => {
    const [cartItemsData, setCartItemsData] = useState<CartItemData[]>([])
    const cart = useSelector((state: StoreState) => state.cartState)
    const itemsData = useSelector((state: StoreState) => state.itemDataState)

    useEffect(() => {
        if (cart !== undefined && itemsData !== undefined) {
            setCartItemsData(getCartItemsData(itemsData, cart).reverse())
        }
    }, [cart, itemsData])
    return (
        <div className={styles.cart}>
            <div className={styles.firstLine}>
                <h1 className={styles.label}>Корзина</h1>
                <Link to="/">
                    <h3 className={styles.linkToHome}>Вернуться на главную</h3>
                </Link>
            </div>
            <CartTable
                tableSize={['128px', '35%', '64px', '64px']}
                cartItemsData={cartItemsData}
            />
        </div>
    )
}
