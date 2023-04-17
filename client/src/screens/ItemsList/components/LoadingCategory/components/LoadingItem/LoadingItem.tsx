import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './LoadingItem.module.css'

interface Props {
    style?: CSSProperties
}

export const LoadingItem: FC<Props> = ({ style }) => {
    return <li className={styles.item} style={style}></li>
}
