import React, { useState, useEffect, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ServerOrder } from '@/interfaces'
import { ReduxStore, setViewedToOrders } from '@/redux/store'
import { UserContext } from '@/App'
import { getOrdersHasNewStatuses } from '@/functions'
import { setUserOrdersViewed } from '@/services/apiService'
import { InfoSection } from './components/InfoSection'
import { OrdersSection } from './components/OrdersSection'
import styles from './Profile.module.css'

interface Props {
    style?: CSSProperties
}

export const Profile: FC<Props> = ({ style }) => {
    const [orders, setOrders] = useState<ServerOrder[]>([])
    const [shouldUpdateStatuses, setShouldUpdateStatuses] =
        useState<boolean>(false)
    const user = useContext(UserContext)
    const dispatch = useDispatch()
    const ordersLocalStorage = useSelector(
        (state: ReduxStore) => state.localOrdersDataStore
    )
    const ordersUser = useSelector((state: ReduxStore) => state.userOrdersStore)

    useEffect(() => {
        if (ordersLocalStorage && ordersUser) {
            const shouldUpdateStatuses = getOrdersHasNewStatuses(ordersUser)
            setShouldUpdateStatuses(shouldUpdateStatuses)

            const reverseUserOrders = JSON.parse(
                JSON.stringify(ordersUser)
            ).reverse()
            setOrders(reverseUserOrders)
        }
    }, [ordersLocalStorage, ordersUser])

    const onOrdersHover = (): void => {
        if (shouldUpdateStatuses) {
            dispatch(setViewedToOrders())
            if (user) {
                user.getIdToken()
                    .then((token) => {
                        setUserOrdersViewed(token).catch(console.error)
                    })
                    .catch(console.error)
            }
        }
    }

    return (
        <main className={styles.profile} style={style}>
            <div className={styles.firstLine}>
                <h1 className={styles.label}>Профиль</h1>
                <Link to="/">
                    <h3 className={styles.linkToHome}>Вернуться на главную</h3>
                </Link>
            </div>
            <div className={styles.sectionsContainer}>
                <InfoSection />
                <div className={styles.verticalLine} />
                <OrdersSection orders={orders} onHover={onOrdersHover} />
            </div>
        </main>
    )
}
