import React, { useState, useEffect, useContext } from 'react'
import type { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ReduxStore, updateLoginWindowState } from '@/redux/store'
import { UserData } from '@/interfaces'
import { UserContext } from '@/App'
import { getOrdersHasNewStatuses } from '@/functions'
import LoginImg from './images/Login.png'
import styles from './ProfileButton.module.css'

export const ProfileButton: FC = () => {
    // Get user data
    const user = useContext(UserContext)
    const [userData, setUserData] = useState<UserData>({ isLoggedIn: false })
    const reduxUserData = useSelector(
        (state: ReduxStore) => state.userStateStore
    )

    useEffect(() => {
        if (reduxUserData) {
            setUserData(reduxUserData)
        }
    }, [reduxUserData])

    // Get user orders to understand do we need to show notify icon
    const [shouldNotify, setShouldNotify] = useState<boolean>(false)
    const userOrders = useSelector((state: ReduxStore) => state.userOrdersStore)
    useEffect(() => {
        if (userOrders) {
            const shouldNotify = getOrdersHasNewStatuses(userOrders)
            setShouldNotify(shouldNotify)
        }
    }, [userOrders])

    // On submit if user is not logged in
    const dispatch = useDispatch()

    const handleOpenLogInWindow = (): void => {
        dispatch(updateLoginWindowState(true))
    }

    // On submit is user is logged in
    const history = useHistory()

    const handleOpenProfile = (): void => {
        window.scrollTo(0, 0)
        history.push('/profile')
    }
    return (
        <button
            className={styles.profile}
            onClick={
                userData.isLoggedIn ? handleOpenProfile : handleOpenLogInWindow
            }
        >
            <div className={styles.profileImage}>
                <img
                    className={styles.profile}
                    // style={userData.user?.photoURL ? { border: '2px solid #FFF' } : {}}
                    src={user?.photoURL ? user.photoURL : LoginImg}
                />
                {shouldNotify ? <span className={styles.notification} /> : null}
            </div>
            <p className={styles.profile}>
                <span>
                    {user
                        ? userData?.displayName
                            ? userData.displayName.split(' ')[0]
                            : 'Профиль'
                        : `Войти`}
                </span>
            </p>
        </button>
    )
}
