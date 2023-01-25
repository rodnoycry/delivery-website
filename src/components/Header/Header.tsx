import React from 'react'
import type { FC } from 'react'
import styles from './Header.module.css'
import LogoImg from './images/Logo.png'
import PhoneImg from './images/Phone.png'
import DeliveryImg from './images/Delivery.png'
import LoginImg from './images/Login.png'
import CartImg from './images/Cart.png'

export const Header: FC = (props) => {
    const itemsQty = 14
    const sum = 200

    return (
        <header>
            <div className={styles.headerBlocks}>
                <img className={styles.logo} src={LogoImg} />
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
                <button className={styles.login}>
                    <img className={styles.login} src={LoginImg} />
                    <p className={styles.login}>{`Войти`}</p>
                </button>
                <button className={styles.cart}>
                    <div className={styles.cartCounter}>
                        <img className={styles.cart} src={CartImg} />
                        <span className={styles.cartCounter}>{itemsQty}</span>
                    </div>
                    <p className={styles.cart}>
                        <span>{sum}</span>
                        {` руб.`}
                    </p>
                </button>
            </div>
            <hr style={{ border: '1px solid #313131' }} />
        </header>
    )
}
