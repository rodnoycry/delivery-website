import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/firebase'
import { getIsAdmin, getItems, getOrders } from '@/services/apiService'
import { domain } from '@/services/apiService/config'
import { ItemData, ServerOrder } from '@/interfaces'
import styles from './Panel.module.css'
import { Header, AdminOrder } from './components'
// FOR TESTS
import { signOut } from './functions'

export const Panel: FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const [isIntruder, setIsIntruder] = useState<boolean>(false)

    const [showIsActive, setShowIsActive] = useState<boolean>(true)

    const [timeToNextRequest, setTimeToNextRequest] = useState<number>(6)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [soundOn, setSoundOn] = useState<boolean>(true)

    const [orders, setOrders] = useState<ServerOrder[]>([])
    const [ordersQty, setOrdersQty] = useState<number>(0)
    const [shouldNotify, setShouldNotify] = useState<boolean>(false)

    const [itemsData, setItemsData] = useState<ItemData[]>([])

    const notification = new Audio(`${domain}/audio/notification.mp3`)

    useEffect(() => {
        getItems().then(setItemsData).catch(console.error)
    }, [])

    useEffect(() => {
        if (itemsData) {
            updateOrders()
        }
    }, [itemsData])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeToNextRequest((prevTime) => prevTime - 1)
        }, 1000)

        if (timeToNextRequest === 0) {
            updateOrders()
            setTimeToNextRequest(6)
        }

        return () => {
            clearInterval(interval)
        }
    }, [orders, timeToNextRequest])

    // Admin auth check
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIsAdmin(user, setIsAdmin)
                    .then(setIsAdmin)
                    .catch((error) => {
                        setIsAdmin(isAdmin)
                        console.error(error)
                    })
            } else {
                setUser(null)
            }
        })
        if (isIntruder) {
            // history.push('/') // CHANGE ON PROD
            console.error()
        }
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        updateOrders()
    }, [user])

    // Non-admin redirect
    useEffect(() => {
        if (user && !isAdmin) {
            // history.push('/') // CHANGE ON PROD
            setIsIntruder(true)
            console.log(user, isAdmin)
        }
    }, [isAdmin])

    const updateOrders = (): void => {
        if (!user) {
            return
        }
        user.getIdToken()
            .then(async (token) => {
                return await getOrders(token)
            })
            .then((orders) => {
                if (!orders) {
                    return
                }
                if (shouldNotify && soundOn && orders.length > ordersQty) {
                    notification.play().catch(console.error)
                }
                setOrders(orders.reverse())
                setOrdersQty(orders.length)
                setErrorMessage('')
                if (!shouldNotify) {
                    setShouldNotify(true)
                }
            })
            .catch((error) => {
                console.error(error)
                setErrorMessage(
                    'Произошла ошибка запроса к серверу, пытаемся подключиться ещё раз'
                )
            })
    }

    const handleSignOut = (): void => {
        signOut(setUser, () => {})
            .then(() => {
                setIsAdmin(false)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <>
            <div className={styles.admin}>
                <Header soundOn={soundOn} setSoundOn={setSoundOn} />
                <div className={styles.navContainer}>
                    <div className={styles.nav}>
                        <button
                            className={styles.button}
                            style={{
                                backgroundColor: showIsActive
                                    ? '#FF000A'
                                    : '#222',
                            }}
                            onClick={() => {
                                setShowIsActive(true)
                            }}
                        >
                            Активные заказы
                        </button>
                        <button
                            className={styles.button}
                            style={{
                                backgroundColor: showIsActive
                                    ? '#222'
                                    : '#FF000A',
                            }}
                            onClick={() => {
                                setShowIsActive(false)
                            }}
                        >
                            Завершённые заказы
                        </button>
                    </div>
                </div>
                <div>
                    <h1>
                        Список заказов обновится через {timeToNextRequest - 1}{' '}
                        секунд
                        {[4, 3, 2].includes(timeToNextRequest - 1) ? 'ы' : ''}
                        {timeToNextRequest - 1 === 1 ? 'у' : ''}
                    </h1>
                    <h1 style={{ color: '#FF000A' }}>{errorMessage}</h1>
                </div>
                <div className={styles.orders} style={{ marginTop: 20 }}>
                    {orders
                        .filter((order) => order.isActive === showIsActive)
                        .map((order) => {
                            return (
                                <AdminOrder
                                    key={`${order.id}${order.time}`}
                                    user={user}
                                    showIsActive={showIsActive}
                                    order={order}
                                    itemsData={itemsData}
                                />
                            )
                        })}
                    {`Скоро здесь появятся новые заказы!`}
                </div>
            </div>
            <div style={{ width: `90%` }}>
                <button
                    className={styles.signOut}
                    style={{
                        fontFamily: 'Montserrat',
                        fontSize: 16,
                        marginTop: 30,
                    }}
                    onClick={handleSignOut}
                >
                    Выйти из аккаунта
                </button>
            </div>
        </>
    )
}
