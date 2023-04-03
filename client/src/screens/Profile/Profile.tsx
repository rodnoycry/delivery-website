import React, { useState, useEffect, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState as StoreState, updateUserState } from '@/redux/store'
import { UserContext } from '@/App'
import styles from './Profile.module.css'
import { Info } from './components'
import NameImg from './images/Name.png'
import EmailImg from './images/Email.png'
import PhoneImg from './images/Phone.png'

interface Props {
    style?: CSSProperties
}

export const Profile: FC<Props> = ({ style }) => {
    const user = useContext(UserContext)
    const userData = useSelector((state: StoreState) => state.userState)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false)
    const dispatch = useDispatch()

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
    return (
        <main className={styles.profile} style={style}>
            <h1 className={styles.label}>Профиль</h1>
            <div className={styles.sectionsContainer}>
                <section className={styles.info}>
                    <h2 className={styles.sectionLabel}>Личные данные</h2>
                    <div className={styles.infoContainer}>
                        <Info
                            name="Имя"
                            value={userData.displayName}
                            image={NameImg}
                            isEditable={true}
                            onUpdate={(value: string) => {
                                dispatch(
                                    updateUserState({ displayName: value })
                                )
                            }}
                        />
                    </div>
                </section>
            </div>
        </main>
    )
}
