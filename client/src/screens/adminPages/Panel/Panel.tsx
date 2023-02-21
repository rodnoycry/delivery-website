import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { onAuthStateChanged, User } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import { auth } from '@/firebase'
import { getIsAdminFromServer, createSampleUser } from '@/services/apiService'
import { AdminOrder } from '@/redux/slices/adminOrdersSlice'
import { RootState as StoreState } from '@/redux/store'
import styles from './Panel.module.css'
import LogoImg from './images/Logo.png'
import EditImg from './images/Edit.png'
import BonusImg from './images/Bonus.png'
import SoundOnImg from './images/SoundOn.png'
import SoundOffImg from './images/SoundOff.png'
import { Order } from './components/Order'
// FOR TESTS
import { signOut } from './functions'

export const Panel: FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const [isIntruder, setIsIntruder] = useState<boolean>(false)

    const [soundOn, setSoundOn] = useState<boolean>(true)

    const [orders, setOrders] = useState<AdminOrder[]>([])
    const itemsData = useSelector((state: StoreState) => state.itemDataState)
    const reduxOrders = useSelector(
        (state: StoreState) => state.adminOrdersState
    )

    const history = useHistory()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIsAdmin(user)
                    .then(setIsAdmin)
                    .catch((error) => {
                        setIsAdmin(isAdmin)
                        console.log(error)
                    })
            } else {
                setUser(null)
            }
            return () => {
                unsubscribe()
            }
        })
        if (isIntruder) {
            // history.push('/') // CHANGE ON PROD
            console.log()
        }
    }, [])

    useEffect(() => {
        if (user && !isAdmin) {
            // history.push('/') // CHANGE ON PROD
            setIsIntruder(true)
            console.log(user, isAdmin)
        }
    }, [isAdmin])

    useEffect(() => {
        if (reduxOrders) {
            setOrders(reduxOrders)
        }
    }, [reduxOrders, itemsData])

    const getIsAdmin = async (user: User): Promise<boolean> => {
        if (!user) {
            return false
        }
        const isAdmin_ = await user
            .getIdToken()
            .then(
                async (token) => await getIsAdminFromServer({ idToken: token })
            )
            .then((isAdmin) => {
                setIsAdmin(isAdmin)
                console.log(`isAdmin = `, isAdmin)
                return isAdmin
            })
            .catch((error) => {
                console.log(error.message)
                return false
            })
        return isAdmin_
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

    const handleAddUser = (): void => {
        createSampleUser()
            .then(() => {
                console.log('success?')
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <div className={styles.admin}>
            <div className={styles.header}>
                <img className={styles.header} src={LogoImg} />
                <button className={styles.header}>
                    <img className={styles.edit} src={EditImg} />
                    <h1>Редактировать сайт</h1>
                </button>
                <button className={styles.header}>
                    <img className={styles.edit} src={BonusImg} />
                    <h1>Бонусные программы</h1>
                </button>
                <div className={styles.notifications}>
                    <h1>Уведомления:</h1>
                    <img
                        className={styles.notifications}
                        src={soundOn ? SoundOnImg : SoundOffImg}
                        onClick={() => {
                            setSoundOn(!soundOn)
                        }}
                    />
                </div>
            </div>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleAddUser}>Add sample user</button>
            <div className={styles.orders} style={{ marginTop: 20 }}>
                {orders.map((order) => {
                    return <Order key={order.time} {...order} />
                })}
            </div>
        </div>
    )
}
