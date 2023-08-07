import React, {
    useState,
    useEffect,
    useContext,
    createRef,
    useRef,
} from 'react'
import type { FC } from 'react'
import styles from './Category.module.css'
import { useSelector } from 'react-redux'
import { ReduxStore } from '@/redux/store'
import { CategoryName, ItemData } from '@/interfaces'
import { categoryNamesDecode } from '@/config'
import { IsAdminContext, ItemStyleContext } from '../../ItemsList'
import AddImage from './images/Add.png'
import { Item } from './components/Item'
import { BlankItem } from './components/BlankItem'
import { UpdateItemWindow } from './components/UpdateItemWindow'
import { ScreenSizeContext } from '@/utils'

interface Props {
    type: CategoryName | 'searchResults'
    itemsData: ItemData[]
    reloadData: () => void
    style?: object
}

const blankItemData: ItemData = {
    id: '0',
    type: 'pizza',
    image: '',
    name: '',
    description: '',
    isNew: true,
    spiciness: 0,
    qty: 1,
    price: 0,
}

const calculateElementCumulativeHeight = (
    parentRef: React.RefObject<HTMLElement>
): number => {
    let totalHeight = 0
    if (!parentRef.current) return 0
    Array.from(parentRef.current.children).forEach((child) => {
        const rect = child.getBoundingClientRect()
        const style = window.getComputedStyle(child)

        const marginTop = parseFloat(style.marginTop) || 0
        const marginBottom = parseFloat(style.marginBottom) || 0

        totalHeight += rect.height + marginTop + marginBottom
    })
    return totalHeight
}

export const Category: FC<Props> = ({ type, itemsData, reloadData, style }) => {
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false)
    const [isEditingItem, setIsEditingItem] = useState<boolean>(false)
    if (['pizza', 'wok'].includes(type)) {
        blankItemData.price = [0, 0, 0]
    }
    const [currentItemData, setCurrentItemData] =
        useState<ItemData>(blankItemData)
    const { itemStyle, setItemStyle } = useContext(ItemStyleContext)
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
    const title = type !== 'searchResults' ? categoryNamesDecode[type] : null
    let handleAddItem = (): void => {}
    if (isAdmin) {
        handleAddItem = (): void => {
            setIsAddingItem(true)
        }
    }
    const itemContainerRefs = useRef(
        itemsData.map(() => createRef<HTMLLIElement>())
    )
    const infoContainerRefs = useRef(
        itemsData.map(() => createRef<HTMLDivElement>())
    )
    const { width } = useContext(ScreenSizeContext)
    const [infoContainerMaxHeight, setInfoContainerMaxHeight] =
        useState<number>()
    useEffect(() => {
        if (width > 600) {
            const maxHeight = Math.max(
                ...itemContainerRefs.current.map((itemContainerRef) =>
                    calculateElementCumulativeHeight(itemContainerRef)
                )
            )
            setItemStyle((prevItemStyle) => {
                return { ...prevItemStyle, height: maxHeight }
            })
        } else {
            const maxHeight = Math.max(
                ...infoContainerRefs.current.map((infoContainerRef) =>
                    calculateElementCumulativeHeight(infoContainerRef)
                )
            )
            setItemStyle((prevItemStyle) => {
                return { ...prevItemStyle, height: maxHeight }
            })
        }
        setInfoContainerMaxHeight(
            Math.max(
                ...infoContainerRefs.current.map((infoContainerRef) =>
                    calculateElementCumulativeHeight(infoContainerRef)
                )
            )
        )
    }, [width])
    return (
        <>
            <div className={styles.category} style={style}>
                <h1 className={styles.category}>
                    {title || `Результаты поиска`}
                </h1>
                {(itemsData.length !== 0 || isAdmin) && (
                    <ul className={styles.category}>
                        {isAdmin ? (
                            <li
                                className={styles.addItem}
                                onClick={handleAddItem}
                            >
                                <img
                                    className={styles.addItem}
                                    src={AddImage}
                                />
                            </li>
                        ) : null}
                        {itemsData.map((itemData, index) => {
                            const selected =
                                itemData.id in itemsStates
                                    ? itemsStates[itemData.id].selected
                                    : false
                            return (
                                <Item
                                    key={itemData.id}
                                    {...itemData}
                                    itemContainerRef={
                                        itemContainerRefs.current[index]
                                    }
                                    infoContainerRef={
                                        infoContainerRefs.current[index]
                                    }
                                    infoContainerMaxHeight={undefined}
                                    qtyInCart={0}
                                    selected={selected}
                                    setIsEditingItem={
                                        isAdmin ? setIsEditingItem : undefined
                                    }
                                    setCurrentItemData={
                                        isAdmin ? setCurrentItemData : undefined
                                    }
                                />
                            )
                        })}
                    </ul>
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
