import React, { useState, useEffect, CSSProperties } from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import { ServerOrder } from '@/interfaces'
import { Order } from '@/components/shared/Order'
import styles from './OrdersSection.module.css'

interface Props {
    style?: CSSProperties
}

export const OrdersSection: FC<Props> = ({ style }) => {
    const [orders, setOrders] = useState<ServerOrder[]>([])
    const itemsData = useSelector((state: ReduxStore) => state.itemsDataStore)
    const ordersLocalStorage = useSelector(
        (state: ReduxStore) => state.localOrdersDataStore
    )
    const ordersUser = useSelector((state: ReduxStore) => state.userOrdersStore)

    useEffect(() => {
        if (ordersLocalStorage && ordersUser) {
            setOrders(ordersUser)
        }
    }, [ordersLocalStorage, ordersUser])
    return (
        <section className={styles.orders}>
            <h2 className={styles.sectionLabel}>Заказы</h2>
            <div className={styles.orders}>
                {orders.map((order) => {
                    return (
                        <Order
                            key={order.id}
                            showIsActive={true}
                            order={order}
                            itemsData={itemsData}
                        />
                    )
                })}
            </div>
        </section>
    )
}
