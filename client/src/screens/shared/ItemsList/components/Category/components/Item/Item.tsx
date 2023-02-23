import React, { useState, useEffect, useContext, CSSProperties } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    RootState as StoreState,
    addCartItem,
    removeCartItem,
} from '@/redux/store'
import { getPrice, getQty } from './functions'
import styles from './Item.module.css'
import { ItemData, CartItemData } from '@/interfaces'
import { IsAdminContext } from '@/screens/shared/ItemsList/ItemsList'
import { Selector } from './components/Selector'
import { Button } from './components/Button'
import { Counter } from './components/Counter'
import { CartItem } from '@/redux/slices/cartSlice'
import EditImage from './images/Edit.png'

interface Props extends CartItemData {
    setIsEditingItem?: (isEditingItem: boolean) => void
    setCurrentItemData?: (itemData: ItemData) => void
    style?: CSSProperties
}

export const Item: FC<Props> = ({
    id,
    type,
    image,
    name,
    description,
    isNew,
    spiciness,
    qty: innerQty,
    price,
    selected: selected_,
    setIsEditingItem,
    setCurrentItemData,
    style,
}) => {
    selected_ = selected_ !== false && selected_ !== undefined ? selected_ : 1
    const [selected, setSelected] = useState(selected_)
    const isAdmin = useContext(IsAdminContext)
    const defaultCart: CartItem[] = []
    const cart =
        useSelector((state: StoreState) => state.cartState) || defaultCart
    const [qty, setQty] = useState(getQty(cart, id, selected as number))
    const dispatch = useDispatch()
    useEffect(() => {
        setQty(getQty(cart, id, selected as number))
    }, [selected, cart])

    // Methods for buttons to add or remove item
    const addItem = (): void => {
        dispatch(addCartItem({ id, selected }))
        setQty(qty + 1)
    }
    const removeItem = (): void => {
        dispatch(removeCartItem({ id, selected }))
        setQty(qty - 1)
    }

    // Button or counter depends if item was already added
    const getButton = (qty: number): JSX.Element => {
        return qty > 0 ? (
            <Counter qty={qty} addItem={addItem} removeItem={removeItem} />
        ) : (
            <Button addItem={addItem} />
        )
    }

    const handleEditItem = (): void => {
        if (setIsEditingItem && setCurrentItemData) {
            setIsEditingItem(true)
            setCurrentItemData({
                id,
                type,
                image,
                name,
                description,
                isNew,
                spiciness,
                qty,
                price,
            })
        }
    }
    return (
        <li className={styles.item} style={style} key={id}>
            {isNew ? <div className={styles.newLabel}>New</div> : null}
            {isAdmin ? (
                <button className={styles.adminEdit} onClick={handleEditItem}>
                    <img className={styles.adminEdit} src={EditImage} />
                </button>
            ) : null}
            <img className={styles.item} src={image} />
            <h1 className={styles.item}>{name}</h1>
            <p
                className={styles.item}
                style={{
                    height:
                        type === 'pizza' || type === 'wok' ? '66px' : '96px',
                }}
            >
                {description}
            </p>
            <Selector
                type={type}
                selected={selected as number}
                itemId={id}
                setItemSelected={setSelected}
                style={{ marginTop: '7px' }}
            />
            <span className={styles.itemQty}>
                {innerQty ? `${innerQty} шт.` : `\u00a0`}
            </span>
            <div className={styles.item}>
                <span className={styles.item}>
                    {getPrice(type, price, selected as number)}₽
                </span>
                {getButton(qty)}
            </div>
        </li>
    )
}
