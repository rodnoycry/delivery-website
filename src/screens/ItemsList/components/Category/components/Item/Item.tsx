import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    RootState as StoreState,
    addCartItem,
    removeCartItem,
} from '@/redux/store'
import { getPrice, getQty } from './functions'
import styles from './Item.module.css'
import { Selector } from './components/Selector'
import { Button } from './components/Button'
import { Counter } from './components/Counter'
import { CartItem } from '@/redux/slices/cartSlice'

interface ItemData {
    id: number
    type: string
    image: string
    name: string
    description: string
    isNew: boolean
    spiciness: number
    price: number | number[]

    selected: number | false
}

interface Props extends ItemData {}

export const Item: FC<Props> = ({
    id,
    type,
    image,
    name,
    description,
    isNew,
    spiciness,
    price,
    selected: selected_,
}) => {
    selected_ = selected_ !== false ? selected_ : 1
    const [selected, setSelected] = useState(selected_)
    const defaultCart: CartItem[] = []
    const cart =
        useSelector((state: StoreState) => state.cartState) || defaultCart
    const [qty, setQty] = useState(getQty(cart, id, selected))
    useEffect(() => {
        setQty(getQty(cart, id, selected))
    }, [selected])
    const dispatch = useDispatch()

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
    return (
        <li className={styles.item} key={id}>
            {isNew ? <div className={styles.newLabel}>New</div> : null}
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
                selected={selected}
                itemId={id}
                setItemSelected={setSelected}
                style={{ marginTop: '7px' }}
            />
            <div className={styles.item}>
                <span className={styles.item}>
                    {getPrice(type, price, selected)}₽
                </span>
                {getButton(qty)}
            </div>
        </li>
    )
}
