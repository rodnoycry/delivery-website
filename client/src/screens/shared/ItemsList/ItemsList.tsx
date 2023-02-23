import React, { createContext } from 'react'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ItemsList.module.css'
import { itemsPathsRenderData } from '@/config'
import { Category } from './components/Category'

interface Props {
    isAdmin: boolean
    search: string
    style?: object
}

export const IsAdminContext = createContext<boolean>(false)

export const ItemsList: FC<Props> = ({ isAdmin, search, style }) => {
    let categoriesData
    const location = useLocation()
    const path = location.pathname
    const isSearch = path.startsWith('/search')
    if (!isSearch) {
        const { title, data } =
            itemsPathsRenderData[path as keyof typeof itemsPathsRenderData]
        categoriesData = [{ [title]: data }]
    } else {
        categoriesData = [{}]
    }
    return (
        <IsAdminContext.Provider value={isAdmin}>
            <main className={styles.itemsList}>
                {categoriesData.map((categoryData) => {
                    const title = Object.keys(categoryData)[0]
                    const itemsData = categoryData[title]
                    return (
                        <Category
                            key={title}
                            title={title}
                            itemsData={itemsData}
                        />
                    )
                })}
            </main>
        </IsAdminContext.Provider>
    )
}
