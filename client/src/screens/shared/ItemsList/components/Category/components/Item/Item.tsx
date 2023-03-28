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
import { ItemData, CartItemData, CartItem } from '@/interfaces'
import { IsAdminContext } from '@/screens/shared/ItemsList/ItemsList'
import { UserContext } from '@/App'
import { Selector } from './components/Selector'
import { Button } from './components/Button'
import { Counter } from './components/Counter'
import EditImage from './images/Edit.png'
import { domain } from '@/services/apiService/config'

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

    // Authentification related
    const user = useContext(UserContext)

    // Methods for buttons to add or remove item
    const addItem = async (): Promise<void> => {
        let idToken
        try {
            if (user) {
                idToken = await user.getIdToken()
            }
        } catch (error) {
            console.error(error)
            throw new Error(`Item.tsx: retrieving idToken failed`)
        }
        dispatch(addCartItem({ item: { id, selected }, idToken }))
        setQty(qty + 1)
    }

    const removeItem = async (): Promise<void> => {
        let idToken
        try {
            if (user) {
                idToken = await user.getIdToken()
            }
        } catch (error) {
            console.error(error)
            throw new Error(`Item.tsx: retrieving idToken failed`)
        }
        dispatch(removeCartItem({ item: { id, selected }, idToken }))
        setQty(qty - 1)
    }

    // Button or counter depends if item was already added
    const getButton = (qty: number): JSX.Element => {
        return qty > 0 ? (
            <Counter
                qty={qty}
                addItem={() => {
                    addItem().catch(console.error)
                }}
                removeItem={() => {
                    removeItem().catch(console.error)
                }}
            />
        ) : (
            <Button
                addItem={() => {
                    addItem().catch(console.error)
                }}
            />
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
                qty: innerQty,
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
            <div className={styles.imgContainer}>
                <img className={styles.item} src={`${domain}${image}`} />
            </div>
            <div
                className={styles.labelAndDescription}
                style={{
                    height:
                        type === 'pizza' || type === 'wok' ? '110px' : '140px',
                }}
            >
                <h1 className={styles.item}>{name}</h1>
                <p className={styles.item}>{description}</p>
            </div>
            {type !== 'wok' || name.includes('WOK') ? (
                <Selector
                    type={type}
                    selected={selected as number}
                    itemId={id}
                    setItemSelected={setSelected}
                    style={{ marginTop: '7px' }}
                />
            ) : null}
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
