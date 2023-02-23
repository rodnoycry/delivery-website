import React, { useState, useEffect, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './Category.module.css'
import { useSelector } from 'react-redux'
import { RootState as StoreState } from '@/redux/store'
import { ItemData } from '@/interfaces'
import { IsAdminContext } from '../../ItemsList'
import AddImage from './images/Add.png'
import { Item } from './components/Item'

interface Props {
    title: string
    itemsData: ItemData[]
    style?: object
}

const blankItemData: ItemData = {
    id: 0,
    type: '',
    image: '',
    name: '',
    description: '',
    isNew: false,
    spiciness: 0,
    qty: 0,
    price: 0,
}

export const Category: FC<Props> = ({ title, itemsData, style }) => {
    const [isAddingItem, setIsAddingItem] = useState<boolean>()
    const [isEditingItem, setIsEditingItem] = useState<boolean>()
    const [currentItemData, setCurrentItemData] =
        useState<ItemData>(blankItemData)

    useEffect(() => {
        if (!isEditingItem) {
            setCurrentItemData(blankItemData)
        }
    }, [isEditingItem])

    useEffect(() => {
        if (!isEditingItem) {
            setCurrentItemData(blankItemData)
        }
    }, [isAddingItem])

    const isAdmin = useContext(IsAdminContext)
    const itemsStates = useSelector((state: StoreState) => state.itemsStates)
    const itemSizeStyle: CSSProperties = {
        height: 450,
        width: 270,
        borderRadius: 28,
    }
    let handleAddItem = (): void => {}
    if (isAdmin) {
        handleAddItem = (): void => {
            setIsAddingItem(true)
        }
    }
    return (
        <div className={styles.category} style={style}>
            <h1 className={styles.category}>{title}</h1>
            <ul className={styles.category}>
                {itemsData.map((itemData) => {
                    const selected =
                        itemData.id in itemsStates
                            ? itemsStates[itemData.id].selected
                            : false
                    return (
                        <>
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
                        </>
                    )
                })}
                {isAdmin ? (
                    <li
                        className={styles.addItem}
                        style={itemSizeStyle}
                        onClick={handleAddItem}
                    >
                        <img className={styles.addItem} src={AddImage} />
                    </li>
                ) : null}
            </ul>
        </div>
    )
}
