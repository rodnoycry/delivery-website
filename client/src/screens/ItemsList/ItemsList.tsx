import React, {
    useState,
    useEffect,
    createContext,
    CSSProperties,
    useCallback,
} from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import styles from './ItemsList.module.css'
import { CategoryName, ItemData } from '@/interfaces'
import { Category } from './components/Category'
import { LoadingCategory } from './components/LoadingCategory'

interface Props {
    isAdmin: boolean
    search: string
    category: CategoryName | 'searchResults'
    style?: object
}

export const IsAdminContext = createContext<boolean>(false)
export const ItemStyleContext = createContext<{
    itemStyle: CSSProperties
    setItemStyle: React.Dispatch<React.SetStateAction<CSSProperties>>
}>({
    itemStyle: {
        minHeight: 450,
        height: 'auto',
        borderRadius: 28,
    },
    setItemStyle: () => {},
})

export const ItemsList: FC<Props> = ({ isAdmin, search, category, style }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showLoading, setShowLoading] = useState<boolean>(true)
    const [itemsData, setItemsData] = useState<ItemData[] | null>(null)
    const itemsDataStore = useSelector(
        (state: ReduxStore) => state.itemsDataStore
    )
    const [itemStyle, setItemStyle] = useState<CSSProperties>({
        borderRadius: 28,
    })

    const reloadData = useCallback((): void => {
        setIsLoading(true)
        if (itemsDataStore) {
            let filteredItemsData
            if (search.trim()) {
                filteredItemsData = itemsDataStore
                    .filter(
                        (itemData) =>
                            itemData.isActive &&
                            itemData.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                    )
                    .reverse()
            } else {
                filteredItemsData = itemsDataStore
                    .filter(
                        (itemData) =>
                            itemData.isActive && itemData.type === category
                    )
                    .reverse()
            }
            setItemsData(filteredItemsData)
        }
        setIsLoading(false)
    }, [itemsDataStore, category, search])

    useEffect(() => {
        reloadData()
    }, [itemsDataStore, search])

    useEffect(() => {
        setShowLoading(true)
        reloadData()
        setShowLoading(false)
    }, [category])

    return (
        <IsAdminContext.Provider value={isAdmin}>
            <ItemStyleContext.Provider value={{ itemStyle, setItemStyle }}>
                <main className={styles.itemsList} style={style}>
                    {(isLoading && showLoading) || !itemsData ? (
                        <LoadingCategory />
                    ) : itemsData.length !== 0 ? (
                        <Category
                            key={category}
                            type={category}
                            itemsData={itemsData}
                            reloadData={reloadData}
                        />
                    ) : (
                        <div>
                            <h1 className={styles.failedSearch}>
                                Мы не смогли найти результаты по вашему запросу
                                😔
                            </h1>
                        </div>
                    )}
                </main>
            </ItemStyleContext.Provider>
        </IsAdminContext.Provider>
    )
}
