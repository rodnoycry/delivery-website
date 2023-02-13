import React from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './SuccessScreen.module.css'
import SuccessImg from './images/success.png'

interface Props {
    isSuccess: boolean
    setIsSuccess: (isSuccess: boolean) => void
}

export const SuccessScreen: FC<Props> = ({ isSuccess, setIsSuccess }) => {
    return (
        <div
            className={styles.successScreen}
            style={{
                opacity: isSuccess ? 1 : 0,
                display: isSuccess ? '' : 'none',
            }}
        >
            <div className={styles.successWindow}>
                <img className={styles.successWindow} src={SuccessImg} />
                <h1 className={styles.successWindow}>Заказ принят!</h1>
                <h3 className={styles.successWindow}>
                    Ожидайте, скоро мы свяжемся с вами
                </h3>
                <Link
                    to="/"
                    onClick={() => {
                        setIsSuccess(false)
                        window.scrollTo(0, 0)
                    }}
                >
                    <button className={styles.button}>
                        <p className={styles.button}>Вернуться на главную</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}
