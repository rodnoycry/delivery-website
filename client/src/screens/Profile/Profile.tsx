import React, { useState, useEffect, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import {
    RootState as StoreState,
    updateUserName,
    updateLoginWindowState,
    clearUserData,
} from '@/redux/store'
import { UserContext } from '@/App'
import styles from './Profile.module.css'
import { Info } from './components'
import NameImg from './images/Name.png'
import EmailImg from './images/Email.png'
import PhoneImg from './images/Phone.png'
import { auth } from '@/firebase'

interface Props {
    style?: CSSProperties
}

export const Profile: FC<Props> = ({ style }) => {
    const user = useContext(UserContext)
    const userData = useSelector((state: StoreState) => state.userState)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false)
    const dispatch = useDispatch()
    const history = useHistory()

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
    return (
        <main className={styles.profile} style={style}>
            <h1 className={styles.label}>Профиль</h1>
            <div className={styles.sectionsContainer}>
                <section className={styles.info}>
                    <h2 className={styles.sectionLabel}>Личные данные</h2>
                    <div className={styles.infoContainer}>
                        <Info
                            name="Имя"
                            value={userData?.inputStates?.NameInput.value}
                            image={NameImg}
                            isEditable={true}
                            onUpdate={(value: string) => {
                                dispatch(updateUserName(value))
                            }}
                        />
                    </div>
                    <h3 style={{ cursor: 'pointer' }} onClick={signOut}>
                        Выйти из аккаунта
                    </h3>
                </section>
            </div>
        </main>
    )
}
