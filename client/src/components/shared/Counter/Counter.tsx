import React from 'react'
import type { FC } from 'react'
import styles from './Counter.module.css'
import MinusImage from './images/Minus.png'
import PlusImage from './images/Plus.png'

export interface Props {
    qty: number
    addItem: () => void
    removeItem: () => void
    nonZero?: boolean
    style?: object
}

export const Counter: FC<Props> = ({
    qty,
    addItem,
    removeItem,
    nonZero,
    style,
}) => {
    return (
        <div className={styles.counter} style={style}>
            <button
                className={styles.counter}
                onClick={removeItem}
                disabled={nonZero ? qty <= 1 : false}
            >
                <img className={styles.counter} src={MinusImage} />
            </button>
            <span>{`${qty}`}</span>
            <button
                className={styles.counter}
                onClick={addItem}
                disabled={qty >= 99}
            >
                <img src={PlusImage} />
            </button>
        </div>
    )
}
