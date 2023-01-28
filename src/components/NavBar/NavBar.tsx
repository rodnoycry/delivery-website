import React from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

export const NavBar: FC = () => {
    return (
        <nav>
            <Link to="/promo">
                <button className={styles.link}>АКЦИИ</button>
            </Link>
            <Link to="/sets">
                <button className={styles.link}>СЕТЫ</button>
            </Link>
            <Link to="/pizza">
                <button className={styles.link}>ПИЦЦА</button>
            </Link>
            <Link to="/cold-rolls">
                <button className={styles.link}>ХОЛОДНЫЕ РОЛЛЫ</button>
            </Link>
            <Link to="/hot-rolls">
                <button className={styles.link}>ГОРЯЧИЕ РОЛЛЫ</button>
            </Link>
            <Link to="/wok">
                <button className={styles.link}>WOK</button>
            </Link>
            <Link to="/meals">
                <button className={styles.link}>ГОРЯЧЕЕ</button>
            </Link>
            <Link to="/burgers">
                <button className={styles.link}>БУРГЕРЫ</button>
            </Link>
            <Link to="/extra">
                <button className={styles.link}>НАПИТКИ/ДОПЫ</button>
            </Link>
        </nav>
    )
}
