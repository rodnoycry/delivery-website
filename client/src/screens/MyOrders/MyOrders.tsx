import React, { useState, useEffect, CSSProperties } from 'react'
import { ServerOrder, ItemData } from '@/interfaces'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import { Link } from 'react-router-dom'
import { Order } from '@/components/shared/Order'
import { getItems } from '@/services/apiService'
import styles from './MyOrders.module.css'

interface Props {
    style?: CSSProperties
}

export const MyOrders: FC<Props> = ({ style }) => {
    const [orders, setOrders] = useState<ServerOrder[]>([])
    const [itemsData, setItemsData] = useState<ItemData[]>([])
    const localOrders = useSelector(
        (state: ReduxStore) => state.localOrdersDataStore
    )

    useEffect(() => {
        getItems()
            .then(setItemsData)
            .catch((error) => {
                console.error(error)
                setItemsData([])
            })
    }, [])

    useEffect(() => {
        if (localOrders) {
            setOrders(JSON.parse(JSON.stringify(localOrders)).reverse())
        }
    }, [localOrders])

    return (
        <div>
            <div className={styles.pageName}>
                <h1 className={styles.label}>Мои заказы</h1>
                <Link to="/">
                    <h3 className={styles.homeLink}>Вернуться на главную</h3>
                </Link>
            </div>
            <div className={styles.orders}>
                {itemsData
                    ? orders.map((order) => {
                          return (
                              <Order
                                  key={order.id}
                                  showIsActive={true}
                                  order={order}
                                  itemsData={itemsData}
                              />
                          )
                      })
                    : null}
            </div>
        </div>
    )
}
