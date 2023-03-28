import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './LoginWindow.module.css'
import parentStyles from '../../AuthWindow.module.css'

interface Props {
    style?: CSSProperties
}

export const LoginWindow: FC<Props> = ({ style }) => {
    return (
        <div className={parentStyles.authWindow} style={style}>
            LoginWindow
        </div>
    )
}
