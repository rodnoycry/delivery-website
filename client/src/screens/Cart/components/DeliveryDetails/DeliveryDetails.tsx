import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputStates } from '@/redux/slices/inputStatesSlice'
import styles from './DeliveryDetails.module.css'
import { Dropdown } from './components/Dropdown'
import { zoneDeliveryInfo as zoneInfo } from '@/config'

interface Props {
    zone: InputStates['zone']
    setZone: (zone: InputStates['zone']) => void
    isError: boolean
    style?: CSSProperties
}

export const DeliveryDetails: FC<Props> = ({
    zone,
    setZone,
    isError,
    style,
}) => {
    return (
        <div className={styles.details} style={style}>
            <h1 className={styles.zone}>Зона доставки</h1>
            <div className={styles.zone}>
                <div>
                    <Dropdown setZone={setZone} style={{ marginTop: 20 }} />
                    <h4 className={styles.zone}>
                        От {zoneInfo[zone].freeDelivery} рублей доставка
                        бесплатно!
                    </h4>
                </div>
                <div className={styles.zoneInfoContainer}>
                    <div
                        className={styles.zoneInfo}
                        style={{
                            border: isError ? '2px solid #ff000a' : '0px',
                        }}
                    >
                        <h2 className={styles.zoneInfo}>
                            {zoneInfo[zone].minSum} ₽
                        </h2>
                        <h3 className={styles.zoneInfo}>
                            Минимальный
                            <br /> заказ
                        </h3>
                    </div>
                    <div className={styles.zoneInfo}>
                        <h2 className={styles.zoneInfo}>
                            {zoneInfo[zone].deliveryPrice} ₽
                        </h2>
                        <h3 className={styles.zoneInfo}>
                            Стоимость
                            <br /> доставки
                        </h3>
                    </div>
                    <div className={styles.zoneInfo}>
                        <h2 className={styles.zoneInfo}>
                            {zoneInfo[zone].freeDelivery} ₽
                        </h2>
                        <h3 className={styles.zoneInfo}>
                            Бесплатная
                            <br /> доставка от
                        </h3>
                    </div>
                    <div className={styles.zoneInfo}>
                        <h2 className={styles.zoneInfo}>
                            {zoneInfo[zone].approximateTime} минут
                        </h2>
                        <h3 className={styles.zoneInfo}>
                            Среднее время
                            <br /> доставки
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
