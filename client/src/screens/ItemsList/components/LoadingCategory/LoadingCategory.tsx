import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './LoadingCategory.module.css'
import { LoadingItem } from './components/LoadingItem'

interface Props {
    style?: CSSProperties
}

export const LoadingCategory: FC<Props> = ({ style }) => {
    return (
        <div className={styles.category} style={style}>
            <div className={styles.categoryLabel}></div>
            <ul className={styles.category}>
                {[...Array(8).keys()].map((id) => {
                    return (
                        <LoadingItem
                            key={id}
                            style={{ height: 450, width: '100%' }}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
