import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState as StoreState } from '@/redux/store'
import { CartItemData } from '@/interfaces'
import { AdminOrder } from '@/redux/slices/adminOrdersSlice'
import { getCartItemsData } from '@/functions'
import styles from './Order.module.css'
import { Item } from './components/Item'
import { Detail } from './components/Detail'

export const Order: FC<AdminOrder> = ({
    time,
    cart,
    sum,
    phone,
    name,
    deliveryType,
    street,
    house,
    personQty,
    deliveryTime,
    paymentMethod,
    comment,
}) => {
    const [cartItemsData, setCartItemsData] = useState<CartItemData[]>([])
    const itemsData = useSelector((state: StoreState) => state.itemDataState)

    useEffect(() => {
        if (cart !== undefined && itemsData !== undefined) {
            setCartItemsData(getCartItemsData(itemsData, cart).reverse())
        }
    }, [cart, itemsData])

    const detailsObj = {
        'Номер телефона:': phone,
        'Имя:': name,
        'Тип доставки:': deliveryType,
        'Адрес:': `${street ?? ''}, ${house ?? ''}`,
        'Количество персон:': personQty,
        'Время доставки:': deliveryTime,
        'Оплата:': paymentMethod,
        'Комментарий:': comment,
    }
    return (
        <div className={styles.order}>
            <h1 className={styles.order}>Новый заказ ✅</h1>
            <h3 className={styles.order} style={{ marginTop: 5 }}>
                Время заказа: {time}
            </h3>
            <div className={styles.items}>
                {cartItemsData.map((item) => {
                    return <Item key={item.id} {...item} />
                })}
            </div>
            <h1 className={styles.sum}>Сумма заказа {sum} ₽</h1>
            <div className={styles.details}>
                {Object.entries(detailsObj).map(([key, value]) => {
                    return <Detail key={key} key_={key} value={value ?? ''} />
                })}
            </div>
            <button className={styles.button}>Заказ завершён</button>
        </div>
    )
}
