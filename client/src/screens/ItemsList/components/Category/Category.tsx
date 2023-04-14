import React, { useState, useEffect, useContext } from 'react'
import type { FC } from 'react'
import styles from './Category.module.css'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import { ItemData } from '@/interfaces'
import { categoryNamesDecode } from '@/config'
import { IsAdminContext, itemSizeStyle } from '../../ItemsList'
import AddImage from './images/Add.png'
import { Item } from './components/Item'
import { BlankItem } from './components/BlankItem'
import { UpdateItemWindow } from './components/UpdateItemWindow'

interface Props {
    type: string
    itemsData: ItemData[]
    reloadData: () => void
    style?: object
}

const blankItemData: ItemData = {
    id: '0',
    type: '',
    image: '',
    name: '',
    description: '',
    isNew: true,
    spiciness: 0,
    qty: 1,
    price: 0,
}

export const Category: FC<Props> = ({ type, itemsData, reloadData, style }) => {
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false)
    const [isEditingItem, setIsEditingItem] = useState<boolean>(false)
    if (['pizza', 'wok'].includes(type)) {
        blankItemData.price = [0, 0, 0]
    }
    const [currentItemData, setCurrentItemData] =
        useState<ItemData>(blankItemData)
    console.log()
    useEffect(() => {
        if (!isEditingItem) {
            setCurrentItemData({ ...blankItemData, isNew: true })
        }
    }, [isEditingItem])
    useEffect(() => {
        if (!isEditingItem) {
            setCurrentItemData(blankItemData)
        }
    }, [isAddingItem])

    const isAdmin = useContext(IsAdminContext)
    const itemsStates = useSelector(
        (state: ReduxStore) => state.itemsStatesStore
    )
    const title = categoryNamesDecode[type as keyof typeof categoryNamesDecode]
    let handleAddItem = (): void => {}
    if (isAdmin) {
        handleAddItem = (): void => {
            setIsAddingItem(true)
        }
    }
    return (
        <>
            <div className={styles.category} style={style}>
                <h1 className={styles.category}>
                    {title || `Результаты поиска`}
                </h1>
                {itemsData.length !== 0 || isAdmin ? (
                    <ul className={styles.category}>
                        {isAdmin ? (
                            <li
                                className={styles.addItem}
                                style={itemSizeStyle}
                                onClick={handleAddItem}
                            >
                                <img
                                    className={styles.addItem}
                                    src={AddImage}
                                />
                            </li>
                        ) : null}
                        {itemsData.map((itemData) => {
                            const selected =
                                itemData.id in itemsStates
                                    ? itemsStates[itemData.id].selected
                                    : false
                            return (
                                <Item
                                    key={itemData.id}
                                    {...itemData}
                                    qtyInCart={0}
                                    selected={selected}
                                    setIsEditingItem={
                                        isAdmin ? setIsEditingItem : undefined
                                    }
                                    setCurrentItemData={
                                        isAdmin ? setCurrentItemData : undefined
                                    }
                                    style={itemSizeStyle}
                                />
                            )
                        })}
                        <BlankItem style={itemSizeStyle} />
                        <BlankItem style={itemSizeStyle} />
                    </ul>
                ) : (
                    <div>
                        <h1 className={styles.failedSearch}>
                            Мы не смогли найти результаты по вашему запросу 😔
                        </h1>
                    </div>
                )}
            </div>
            {isAddingItem || isEditingItem ? (
                <UpdateItemWindow
                    type={type}
                    itemData={currentItemData}
                    setItemData={setCurrentItemData}
                    isAddingItem={isAddingItem}
                    setIsAddingItem={setIsAddingItem}
                    isEditingItem={isEditingItem}
                    setIsEditingItem={setIsEditingItem}
                    reloadData={reloadData}
                />
            ) : null}
        </>
    )
}
