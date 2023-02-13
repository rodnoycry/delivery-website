import React from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './EmptyCartMessage.module.css'

export const EmptyCartMessage: FC = () => {
    return (
        <div className={styles.message}>
            <h1 className={styles.message}>Корзина пуста</h1>
            <Link to="/">
                <button className={styles.message}>Вернуться на главную</button>
            </Link>
        </div>
    )
}
