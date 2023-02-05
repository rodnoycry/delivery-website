import React from 'react'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Search.module.css'
import SearchImage from './images/Search.png'

interface Props {
    appearancePaths: string[]
}

export const Search: FC<Props> = ({ appearancePaths }) => {
    const location = useLocation()
    const currentPath = location.pathname
    const appearanceStyle =
        appearancePaths.includes(currentPath) || currentPath === '/'
            ? {}
            : { display: 'none' }
    return (
        <div
            style={{ marginTop: '30px', ...appearanceStyle }}
            className={styles.searchContainer}
        >
            <div className={styles.search}>
                <input className={styles.search} placeholder="Поиск" />
                <img className={styles.search} src={SearchImage} />
            </div>
        </div>
    )
}
