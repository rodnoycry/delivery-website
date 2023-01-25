import React from 'react'
import type { FC } from 'react'
import './reset.module.css'
import styles from './App.module.css'
import { Header } from './components/Header'

export const App: FC = () => {
    return (
        <div className={styles.main}>
            <Header />
        </div>
    )
}
