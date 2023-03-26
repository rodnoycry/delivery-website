import React from 'react'
import type { FC } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ProfileButton } from './components/ProfileButton'
import { CartButton } from './components/CartButton'
import styles from './Header.module.css'
import LogoImg from './images/Logo.png'
import MiniLogoImg from './images/LogoMini.png'
import PhoneImg from './images/Phone.png'
import DeliveryImg from './images/Delivery.png'

export const Header: FC = () => {
    // Display settings
    const location = useLocation()
    const currentPath = location.pathname
    const isAdmin = currentPath.startsWith('/admin/editing')
    let shouldShow = true

    if (currentPath.startsWith('/admin')) {
        if (isAdmin) {
            shouldShow = true
        } else {
            shouldShow = false
        }
    }

    return shouldShow ? (
        <header>
            <div className={styles.headerBlocks}>
                <div className={styles.infoContainer}>
                    <Link
                        className={styles.logo}
                        to={isAdmin ? '/admin/editing' : '/'}
                    >
                        <img className={styles.logo} src={LogoImg} />
                        <img className={styles.logoMini} src={MiniLogoImg} />
                    </Link>
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
                <ProfileButton />
                <CartButton />
            </div>
        </header>
    ) : null
}
