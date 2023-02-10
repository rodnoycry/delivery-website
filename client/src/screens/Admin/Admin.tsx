import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { AdminOrder } from '../../redux/slices/adminOrdersSlice'
import { RootState as StoreState } from '../../redux/store'
import styles from './Admin.module.css'
import LogoImg from './images/Logo.png'
import TogglerImg from './images/Toggler.png'
import { Order } from './components/Order'

export const Admin: FC = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([])
    const itemsData = useSelector((state: StoreState) => state.itemDataState)
    const reduxOrders = useSelector(
        (state: StoreState) => state.adminOrdersState
    )
    useEffect(() => {
        if (reduxOrders) {
            setOrders(reduxOrders)
        }
    }, [reduxOrders, itemsData])
    return (
        <div className={styles.admin}>
            <div className={styles.header}>
                <img className={styles.header} src={LogoImg} />
                <div className={styles.notifications}>
                    <h1 className={styles.notifications}>Уведомления:</h1>
                    <img src={TogglerImg} style={{ cursor: 'pointer' }} />
                </div>
            </div>
            {/* <hr
                style={{
                    width: '1200px',
                    border: '1px solid #313131',
                    marginTop: 10,
                }}
            /> */}
            <div className={styles.orders} style={{ marginTop: 20 }}>
                {orders.map((order) => {
                    return <Order key={order.time} {...order} />
                })}
            </div>
        </div>
    )
}
