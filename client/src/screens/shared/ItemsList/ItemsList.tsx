import React, { useState, useEffect, createContext, CSSProperties } from 'react'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './ItemsList.module.css'
import { ItemData } from '@/interfaces'
import { getItems } from '@/services/apiService/items'
import { categoryNamesDecode } from '@/config'
import { Category } from './components/Category'
import { LoadingCategory } from './components/LoadingCategory'

interface Props {
    isAdmin: boolean
    search: string
    style?: object
}

export const itemSizeStyle: CSSProperties = {
    height: 450,
    width: 270,
    borderRadius: 28,
}

const getItemsFromServer = async (
    type: string | undefined = undefined,
    search: string | undefined = undefined,
    setIsLoading: (isLoading: boolean) => void
): Promise<ItemData[]> => {
    setIsLoading(true)
    const itemsData = await getItems(type, search)
        .then((itemsData) => {
            setIsLoading(false)
            return itemsData
        })
        .catch((error) => {
            console.error(error)
            return []
        })
    return itemsData
}

export const IsAdminContext = createContext<boolean>(false)

export const ItemsList: FC<Props> = ({ isAdmin, search, style }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [itemsData, setItemsData] = useState<ItemData[] | null>(null)
    const [category, setCategory] = useState<string | undefined>('init')
    const location = useLocation()
    const reloadData = (): void => {
        getItemsFromServer(category, search, setIsLoading)
            .then(setItemsData)
            .catch((error) => {
                console.error(error)
                setItemsData([])
            })
    }
    useEffect(() => {
        const path = location.pathname
        const category = path.split('/').pop()
        setCategory(category)
    }, [location])
    useEffect(() => {
        if (category !== 'init') {
            reloadData()
        }
    }, [category])
    const title =
        categoryNamesDecode[category as keyof typeof categoryNamesDecode]
    const categoriesData = [{ [title]: itemsData }]
    return (
        <IsAdminContext.Provider value={isAdmin}>
            <main className={styles.itemsList}>
                {isLoading ? (
                    <LoadingCategory />
                ) : (
                    <>
                        {categoriesData.map((categoryData) => {
                            const title = Object.keys(categoryData)[0]
                            return (
                                <Category
                                    key={title}
                                    type={category as string}
                                    itemsData={itemsData as ItemData[]}
                                    reloadData={reloadData}
                                />
                            )
                        })}
                    </>
                )}
            </main>
        </IsAdminContext.Provider>
    )
}
