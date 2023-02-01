import React from 'react'
import type { FC } from 'react'
import styles from './ItemsList.module.css'
import { itemsData as pizzaData } from './mockData/pizza'
import { Category } from './components/Category'

interface Props {
    path: string
    style?: object
}

const pathData = {
    '/pizza': {
        title: 'Пицца',
        data: pizzaData,
    },
}

export const ItemsList: FC<Props> = ({ path, style }) => {
    let categoriesData
    const isSearch = path.startsWith('/search')
    if (!isSearch) {
        const { title, data } = pathData[path as keyof typeof pathData]
        categoriesData = [{ [title]: data }]
    } else {
        categoriesData = [{}]
    }
    return (
        <main className={styles.itemsList}>
            {categoriesData.map((categoryData) => {
                const title = Object.keys(categoryData)[0]
                const itemsData = categoryData[title]
                return (
                    <Category key={title} title={title} itemsData={itemsData} />
                )
            })}
        </main>
    )
}
