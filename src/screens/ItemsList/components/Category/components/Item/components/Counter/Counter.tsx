import React from 'react'
import type { FC } from 'react'
import styles from './Counter.module.css'
import MinusImage from './images/Minus.png'
import PlusImage from './images/Plus.png'

interface Props {
    qty: number
    addItem: () => void
    removeItem: () => void
    style?: object
}

export const Counter: FC<Props> = ({ qty, addItem, removeItem, style }) => {
    return (
        <div className={styles.counter} style={style}>
            <button className={styles.counter} onClick={removeItem}>
                <img className={styles.counter} src={MinusImage} />
            </button>
            <span>{`${qty}`}</span>
            <button className={styles.counter} onClick={addItem}>
                <img src={PlusImage} />
            </button>
        </div>
    )
}
