import React from 'react'
import type { FC } from 'react'
import styles from './Detail.module.css'

interface Props {
    key_: string
    value: string
}

export const Detail: FC<Props> = ({ key_, value }) => {
    return (
        <div className={styles.detail}>
            <p className={styles.key}>{key_}</p>
            <p className={styles.value}>{value}</p>
        </div>
    )
}
