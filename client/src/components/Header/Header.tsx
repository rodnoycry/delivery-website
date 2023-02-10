import React from 'react'
import type { FC } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { CartButton } from './components/CartButton'
import styles from './Header.module.css'
import LogoImg from './images/Logo.png'
import PhoneImg from './images/Phone.png'
import DeliveryImg from './images/Delivery.png'
import LoginImg from './images/Login.png'

export const Header: FC = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const appearanceStyle = currentPath === '/admin' ? { display: 'none' } : {}
    return (
        <header style={appearanceStyle}>
            <div className={styles.headerBlocks}>
                <Link className={styles.logo} to="/">
                    <img className={styles.logo} src={LogoImg} />
                </Link>
                <div className={styles.infoContainer}>
                    <div className={styles.phone}>
                        <img className={styles.phone} src={PhoneImg} />
                        <div className={styles.textContainer}>
                            <h4
                                className={styles.phone}
                            >{`Телефон доставки`}</h4>
                            <p
                                className={styles.phone}
                            >{`+7 (985) 667-64-42`}</p>
                        </div>
                    </div>
                    <div className={styles.delivery}>
                        <img className={styles.delivery} src={DeliveryImg} />
                        <div className={styles.textContainer}>
                            <h4
                                className={styles.delivery}
                            >{`Бесплатная доставка`}</h4>
                            <p className={styles.delivery}>{`от 500 р.`}</p>
                        </div>
                    </div>
                </div>
                <button className={styles.login} style={{ display: 'none' }}>
                    <img className={styles.login} src={LoginImg} />
                    <p className={styles.login}>{`Войти`}</p>
                </button>
                <CartButton />
            </div>
        </header>
    )
}
