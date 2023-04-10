import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { InfoSection } from './components/InfoSection'
import { OrdersSection } from './components/OrdersSection'
import styles from './Profile.module.css'

interface Props {
    style?: CSSProperties
}

export const Profile: FC<Props> = ({ style }) => {
    return (
        <main className={styles.profile} style={style}>
            <div className={styles.firstLine}>
                <h1 className={styles.label}>Профиль</h1>
                <Link to="/">
                    <h3 className={styles.linkToHome}>Вернуться на главную</h3>
                </Link>
            </div>
            <div className={styles.sectionsContainer}>
                <InfoSection />
                <div className={styles.verticalLine} />
                <OrdersSection />
            </div>
        </main>
    )
}
