import React from 'react'
import type { FC } from 'react'
import CartImage from './images/Cart.png'
import styles from './Button.module.css'

interface Props {
    addItem: () => void
    style?: object
}

export const Button: FC<Props> = ({ addItem, style }) => {
    return (
        <button className={styles.button} onClick={addItem} style={style}>
            <img className={styles.button} src={CartImage} />
            <span className={styles.button}>{`В корзину`}</span>
        </button>
    )
}
