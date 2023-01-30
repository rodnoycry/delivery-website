import React from 'react'
import type { FC } from 'react'
import styles from './Search.module.css'
import SearchImage from './images/Search.png'

export const Search: FC = () => {
    return (
        <div className={styles.search}>
            <img className={styles.search} src={SearchImage} />
            <input className={styles.search} placeholder="Поиск" />
        </div>
    )
}
