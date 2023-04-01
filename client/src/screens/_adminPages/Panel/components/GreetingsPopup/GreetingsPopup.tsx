import React from 'react'
import type { FC } from 'react'
import SuccessImg from './images/Success.png'
import styles from './GreetingsPopup.module.css'

interface Props {
    onClick: () => void
}

export const GreetingsPopup: FC<Props> = ({ onClick }) => {
    return (
        <div className={styles.screenArea} onClick={onClick}>
            <div className={styles.popup}>
                <img className={styles.popup} src={SuccessImg} />
                <h2 className={styles.popup}>
                    Добро пожаловать в панель администратора!
                </h2>
                <button className={styles.popup} onClick={onClick}>
                    Закрыть
                </button>
            </div>
        </div>
    )
}
