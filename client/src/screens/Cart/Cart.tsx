import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { Order } from '@/redux/slices/orderSlice'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState as StoreState } from '@/redux/store'
import { getCartItemsData } from './functions'
import { getSumWithDelivery } from '@/functions'
import { CartItemData } from '@/interfaces'
import { zoneDeliveryInfo as zoneInfo } from '@/config'
import styles from './Cart.module.css'
import { CartTable } from './components/CartTable'
import { DeliveryDetails } from './components/DeliveryDetails'
import { EmptyCartMessage } from './components/EmptyCartMessage'

export const Cart: FC = () => {
    const [sum, setSum] = useState(0)
    const [cartItemsData, setCartItemsData] = useState<CartItemData[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const [zone, setZone] = useState<Order['zone']>('Талдом')
    const cart = useSelector((state: StoreState) => state.cartState)
    const order = useSelector((state: StoreState) => state.orderState)
    const itemsData = useSelector((state: StoreState) => state.itemDataState)

    useEffect(() => {
        if (cart && order.zone !== undefined) {
            const sumWithDelivery = getSumWithDelivery(order.zone, cart)
            if (sumWithDelivery) {
                setSum(sumWithDelivery)
                setIsError(false)
            } else {
                setSum(0)
                setIsError(true)
            }
        }
    }, [cart, order])

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
                <div>
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
