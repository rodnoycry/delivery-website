import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { InputStates } from '@/redux/slices/inputStatesSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import { getCartItemsData } from './functions'
import { getItemsData, getSumWithDelivery } from '@/functions'
import { ItemData, CartItemData } from '@/interfaces'
import { zoneDeliveryInfo as zoneInfo } from '@/config'
import styles from './Cart.module.css'
import { CartTable } from './components/CartTable'
import { DeliveryDetails } from './components/DeliveryDetails'
import { EmptyCartMessage } from './components/EmptyCartMessage'

export const Cart: FC = () => {
    const [sum, setSum] = useState(0)
    const [cartItemsData, setCartItemsData] = useState<CartItemData[]>([])
    const [itemsData, setItemsData] = useState<ItemData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [zone, setZone] = useState<InputStates['zone']>('Талдом')
    const cart = useSelector((state: ReduxStore) => state.cartStore)
    const order = useSelector((state: ReduxStore) => state.inputStatesStore)

    useEffect(() => {
        if (cart) {
            getItemsData(cart, setItemsData).catch(console.error)
        }
    }, [cart])

    useEffect(() => {
        if (cart && itemsData && order.zone !== undefined) {
            const sumWithDelivery = getSumWithDelivery(
                order.zone,
                itemsData,
                cart
            )
            if (sumWithDelivery) {
                setSum(sumWithDelivery)
                setIsError(false)
            } else {
                setSum(0)
                setIsError(true)
            }
        }
    }, [itemsData, order])

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
            {cart.length === 0 ? (
                <EmptyCartMessage />
            ) : (
                <CartTable cartItemsData={cartItemsData} />
            )}

            <DeliveryDetails zone={zone} setZone={setZone} isError={isError} />
            <div className={styles.button}>
                <div className={styles.adaptiveContainer}>
                    <Link to="/order-details">
                        <button
                            className={styles.button}
                            disabled={isError}
                            onClick={() => {
                                window.scrollTo(0, 0)
                            }}
                        >
                            Оформить заказ на {sum} ₽
                        </button>
                    </Link>
                    <h4 className={styles.error}>
                        {isError
                            ? `Недостаточная сумма заказа. Для заказа в выбранную зону доставки необходима сумма заказа ${zoneInfo[zone].minSum} ₽`
                            : '\u00a0'}
                    </h4>
                </div>
            </div>
        </div>
    )
}
