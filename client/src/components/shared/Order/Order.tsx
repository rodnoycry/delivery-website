import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { User } from 'firebase/auth'
import axios from 'axios'
import { domain } from '@/services/apiService/config'
import { CartItemData, ItemData, ServerOrder } from '@/interfaces'
import { getCartItemsData, getSum, getSumWithDelivery } from '@/functions'
import type { Zone } from '@/redux/slices/inputStatesSlice'
import styles from './Order.module.css'
import { Item, DeliveryItem } from './components/Item'
import { Detail } from './components/Detail'

interface Props {
    isAdminMode?: boolean
    user?: User | null
    showIsActive: boolean
    order: ServerOrder
    itemsData: ItemData[]
}

export const Order: FC<Props> = ({
    isAdminMode = false,
    user,
    showIsActive,
    order,
    itemsData: parentItemsData,
}) => {
    const {
        id,

        time,
        date,
        cart,
        zone,

        phone,
        name,
        deliveryType,
        locality,
        street,
        house,
        apartment,
        entrance,
        intercom,

        personQty,
        deliveryTimeType,
        deliveryDay,
        deliveryTime,
        paymentMethod,
        hasChange,
        comment,

        isActive: parentIsActive,
        status,
        isNewStatus,
    } = order
    const [isActive, setIsActive] = useState<boolean>(parentIsActive)
    const [hide, setHide] = useState<boolean>(false)
    const [cartItemsData, setCartItemsData] = useState<CartItemData[]>([])
    const [itemsData, setItemsData] = useState<ItemData[]>(parentItemsData)

    const sumWithDelivery = getSumWithDelivery(
        zone as Zone['zone'],
        itemsData,
        cart
    )

    const getDeliveryCost = (): number => {
        const sum = getSum(cart, itemsData)
        if (sumWithDelivery) {
            return sumWithDelivery - sum
        } else {
            return 0
        }
    }

    const deliveryCost = getDeliveryCost()

    useEffect(() => {
        setItemsData(parentItemsData)
    }, [parentItemsData])

    useEffect(() => {
        if (cart.length !== 0 && itemsData.length !== 0) {
            setCartItemsData(getCartItemsData(itemsData, cart).reverse())
        }
    }, [cart, itemsData])

    const detailsObj: Record<string, string> = {
        'Номер телефона:': phone,
        'Имя:': name,
        'Тип доставки:': deliveryType,
    }
    const isDelivery = deliveryType === 'На указанный адрес'
    if (isDelivery) {
        detailsObj['Зона доставки'] = zone
    }
    if (isDelivery && zone !== 'Талдом') {
        detailsObj['Населённый пункт:'] = locality
    }
    if (isDelivery) {
        detailsObj['Адрес:'] = `${street}, ${house}`
    }
    if (isDelivery && apartment) {
        detailsObj['Квартира:'] = apartment
    }
    if (isDelivery && entrance) {
        detailsObj['Подъезд:'] = entrance
    }
    if (isDelivery && intercom) {
        detailsObj['Код домофона:'] = intercom
    }
    detailsObj['Количество персон:'] = personQty
    detailsObj['Время доставки:'] = deliveryTimeType
    if (deliveryTimeType === 'Ко времени') {
        detailsObj['К какому времени:'] = deliveryTime
        detailsObj['К какому дню:'] = deliveryDay
    }
    if (isDelivery) {
        detailsObj['Способ оплаты:'] = paymentMethod
        if (paymentMethod === 'Наличными') {
            detailsObj['Сдача:'] = hasChange
        }
    }
    if (comment) {
        detailsObj['Комментарий:'] = comment
    }

    const handleOnClick = (): void => {
        if (!user) {
            return
        }
        user.getIdToken()
            .then((token) => {
                axios
                    .post(`${domain}/api/orders/edit`, {
                        idToken: token,
                        orderData: {
                            id,
                            isActive: !isActive,
                        },
                    })
                    .catch((error) => {
                        console.error(error)
                        throw new Error()
                    })
            })
            .then(() => {
                // setHide(true)
                setIsActive(!isActive)
            })
            .catch(console.error)
    }
    return hide ? null : (
        <div className={styles.order}>
            {isNewStatus ? <span className={styles.newStatusFlag} /> : null}
            <h3 style={{ opacity: 0.5 }}>#{id}</h3>
            {isAdminMode ? (
                <h1 className={styles.order}>
                    {isActive ? `Новый заказ ✅` : `Заказ #${id}`}
                </h1>
            ) : status ? (
                <h1 className={styles.order}>
                    {status === 'new' ? `Заказ создан ✅` : null}
                    {status === 'inProgress' ? `Заказ готовится ⏳` : null}
                    {status === 'done' ? `Заказ завершён ☑️` : null}
                    {status === 'canceled' ? `Заказ отменён ❌` : null}
                </h1>
            ) : (
                <h1 className={styles.order}>
                    {isActive ? `Заказ завершён ☑️` : null}
                </h1>
            )}

            <h3 className={styles.order} style={{ marginTop: 5 }}>
                Время заказа: {time}
            </h3>
            <h3>{date}</h3>
            <div className={styles.items}>
                {cartItemsData.map((item) => {
                    return <Item key={cartItemsData.indexOf(item)} {...item} />
                })}
                {deliveryCost === 0 ? null : (
                    <DeliveryItem zone={zone} price={deliveryCost} />
                )}
            </div>
            <h1 className={styles.sum}>Сумма заказа {sumWithDelivery} ₽</h1>
            <div className={styles.details}>
                {Object.entries(detailsObj).map(([key, value]) => {
                    return <Detail key={key} key_={key} value={value ?? ''} />
                })}
            </div>
            {isAdminMode ? (
                <button
                    className={styles.button}
                    onClick={handleOnClick}
                    style={{ backgroundColor: isActive ? '#FF000A' : '#222' }}
                >
                    {isActive ? `Завершить заказ` : 'Снова сделать активным'}
                </button>
            ) : null}
        </div>
    )
}
