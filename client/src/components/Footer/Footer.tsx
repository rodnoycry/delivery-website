import React from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

interface Props {
    style?: object
}

export const Footer: FC<Props> = ({ style }) => {
    return (
        <>
            <hr
                style={{
                    border: '1px solid #313131',
                    width: '90vw',
                    marginTop: 50,
                }}
            />
            <footer className={styles.footer} style={style}>
                <div className={styles.links}>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={'/offer'}
                    >
                        <h3>Публичная оферта</h3>
                    </Link>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={'/terms'}
                    >
                        <h3>Пользовательское соглашение</h3>
                    </Link>
                    <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={'/policy'}
                    >
                        <h3>Политика обработки персональных данных</h3>
                    </Link>
                    <Link to={'/'}>
                        <h3>Сан-Сей 2023 ©</h3>
                    </Link>
                </div>
            </footer>
        </>
    )
}
