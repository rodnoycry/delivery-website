import React, { useState, useEffect, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { updateUserData } from '@/services/apiService'
import { Info } from './components'
import { UserContext } from '@/App'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
    ReduxStore,
    updateUserName,
    updateUserPhone,
    updateLoginWindowState,
    clearUserData,
} from '@/redux/store'
import styles from './InfoSection.module.css'
import NameImg from './images/Name.png'
import EmailImg from './images/Email.png'
import PhoneImg from './images/Phone.png'

interface Props {
    style?: CSSProperties
}

export const InfoSection: FC<Props> = ({ style }) => {
    const user = useContext(UserContext)
    const dispatch = useDispatch()
    const history = useHistory()
    const userData = useSelector((state: ReduxStore) => state.userStateStore)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (userData) {
            if (isUserDataLoaded) {
                user?.getIdToken()
                    .then((token) => {
                        console.log()
                    })
                    .catch(console.error)
            } else {
                setIsUserDataLoaded(true)
            }
        }
    }, [userData])

    const signOut = (): void => {
        firebaseSignOut(auth)
            .then(() => {
                history.push('/')
                dispatch(updateLoginWindowState(true))
                dispatch(clearUserData())
            })
            .catch(console.error)
    }
    return user ? (
        <section className={styles.info}>
            <h2 className={styles.sectionLabel}>Личные данные</h2>
            <div className={styles.infoContainer}>
                <Info
                    name="Имя"
                    value={userData?.displayName}
                    image={NameImg}
                    isEditable={true}
                    onUpdate={(value: string) => {
                        dispatch(updateUserName(value.trim()))
                        user?.getIdToken()
                            .then((token) => {
                                updateUserData(token, {
                                    displayName: value,
                                }).catch(console.error)
                            })
                            .catch(console.error)
                    }}
                />
                <Info
                    name="Почта"
                    value={userData?.email}
                    image={EmailImg}
                    isEditable={false}
                />
                <Info
                    name="Телефон"
                    value={userData?.phone}
                    isPhone
                    image={PhoneImg}
                    isEditable={true}
                    onUpdate={(value: string) => {
                        dispatch(updateUserPhone(value))
                        user?.getIdToken()
                            .then((token) => {
                                updateUserData(token, {
                                    phone: value,
                                }).catch(console.error)
                            })
                            .catch(console.error)
                    }}
                />
            </div>
            <h3 className={styles.signOut} onClick={signOut}>
                Выйти из аккаунта
            </h3>
        </section>
    ) : (
        <button
            className={styles.signIn}
            onClick={() => {
                dispatch(updateLoginWindowState(true))
            }}
        >
            Войти
        </button>
    )
}
