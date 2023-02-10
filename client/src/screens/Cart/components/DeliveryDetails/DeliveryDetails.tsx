import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import { Order } from '@/redux/slices/orderSlice'
import styles from './DeliveryDetails.module.css'
import { Dropdown } from './components/Dropdown'
import { zoneDeliveryInfo as zoneInfo } from '@/config'

interface Props {
    isError: boolean
    style?: CSSProperties
}

export const DeliveryDetails: FC<Props> = ({ isError, style }) => {
    const [zone, setZone] = useState<Order['zone'] | Record<string, any>>(
        'Талдом'
    )
    return (
        <div className={styles.details} style={style}>
            <div className={styles.zone}>
                <div>
                    <h1 className={styles.zone}>Зона доставки</h1>
                    <Dropdown setZone={setZone} style={{ marginTop: 20 }} />
                    <h4 className={styles.zone}>
                        От{' '}
                        {zoneInfo[zone as keyof typeof zoneInfo].freeDelivery}{' '}
                        рублей доставка бесплатно!
                    </h4>
                </div>
                <div
                    className={styles.zoneInfo}
                    style={{ border: isError ? '2px solid #ff000a' : '0px' }}
                >
                    <h2 className={styles.zoneInfo}>
                        {zoneInfo[zone as keyof typeof zoneInfo].minSum} ₽
                    </h2>
                    <h3 className={styles.zoneInfo}>
                        Минимальный
                        <br /> заказ
                    </h3>
                </div>
                <div className={styles.zoneInfo}>
                    <h2 className={styles.zoneInfo}>
                        {zoneInfo[zone as keyof typeof zoneInfo].deliveryPrice}{' '}
                        ₽
                    </h2>
                    <h3 className={styles.zoneInfo}>
                        Стоимость
                        <br /> доставки
                    </h3>
                </div>
                <div className={styles.zoneInfo}>
                    <h2 className={styles.zoneInfo}>
                        {zoneInfo[zone as keyof typeof zoneInfo].freeDelivery} ₽
                    </h2>
                    <h3 className={styles.zoneInfo}>
                        Бесплатная
                        <br /> доставка от
                    </h3>
                </div>
                <div className={styles.zoneInfo}>
                    <h2 className={styles.zoneInfo}>
                        {
                            zoneInfo[zone as keyof typeof zoneInfo]
                                .approximateTime
                        }
                        минут
                    </h2>
                    <h3 className={styles.zoneInfo}>
                        Среднее время
                        <br /> доставки
                    </h3>
                </div>
            </div>
        </div>
    )
}
