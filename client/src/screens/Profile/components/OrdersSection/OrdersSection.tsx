import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import { ServerOrder } from '@/interfaces'
import { Order } from '@/components/shared/Order'
import styles from './OrdersSection.module.css'

interface Props {
    orders: ServerOrder[]
    onHover: () => void
    style?: CSSProperties
}

export const OrdersSection: FC<Props> = ({ orders, onHover, style }) => {
    const itemsData = useSelector((state: ReduxStore) => state.itemsDataStore)
    return (
        <section className={styles.orders}>
            <h2 className={styles.sectionLabel}>Заказы</h2>
            <div
                className={styles.orders}
                onMouseEnter={() => {
                    onHover()
                }}
            >
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
