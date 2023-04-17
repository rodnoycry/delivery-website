import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './WindowWrapper.module.css'

interface Props {
    children: React.ReactNode
    onClick: () => void
    style?: CSSProperties
}

export const WindowWrapper: FC<Props> = ({ children, onClick, style }) => {
    return (
        <div className={styles.screen} style={style}>
            {children}
            <div className={styles.background} onClick={onClick} />
        </div>
    )
}
