import React from 'react'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Search.module.css'
import SearchImage from './images/Search.png'

interface Props {
    search: string
    setSearch: (search: string) => void
    appearancePaths: string[]
}

const notAppearPaths = ['/my-orders', '/cart', '/order-details']

export const Search: FC<Props> = ({ search, setSearch, appearancePaths }) => {
    const location = useLocation()
    const currentPath = location.pathname
    const isAdmin = currentPath.startsWith('/admin/editing')
    let shouldShow = true

    if (currentPath.startsWith('/admin')) {
        if (isAdmin) {
            shouldShow = true
        } else {
            shouldShow = !!(
                appearancePaths.includes(currentPath) || currentPath === '/'
            )
        }
    } else {
        shouldShow = !notAppearPaths.includes(currentPath)
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearch(event.target.value)
    }

    return shouldShow ? (
        <div style={{ marginTop: '30px' }} className={styles.searchContainer}>
            <div className={styles.search}>
                <input
                    className={styles.search}
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Поиск"
                />
                <img className={styles.search} src={SearchImage} />
            </div>
        </div>
    ) : null
}
