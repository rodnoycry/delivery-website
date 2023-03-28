import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState as StoreState, updateLoginWindowState } from '@/redux/store'
import styles from './LoginWindow.module.css'
import { WindowWrapper } from '../components/WindowWrapper'
import { LoginWindow } from './components/LoginWindow'

enum DisplayTab {
    Login,
    SignUp,
}

export const AuthWindow: FC = () => {
    const [shouldShow, setShouldShow] = useState<boolean>(false)
    const [displayTab, setDisplayTab] = useState<DisplayTab>(DisplayTab.Login)
    const windowsStore = useSelector((state: StoreState) => state.windowsStates)

    useEffect(() => {
        if (windowsStore !== undefined) {
            setShouldShow((state) => {
                if (state !== windowsStore.login) {
                    setDisplayTab(DisplayTab.Login)
                }
                return windowsStore.login
            })
        }
    }, [windowsStore])

    const dispatch = useDispatch()

    return shouldShow ? (
        <WindowWrapper
            onClick={() => {
                dispatch(updateLoginWindowState(false))
            }}
        >
            {displayTab === DisplayTab.Login ? <LoginWindow /> : null}
        </WindowWrapper>
    ) : null
}
