import React from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import LogoImg from './images/Logo.png'
import EditImg from './images/Edit.png'
import BonusImg from './images/Bonus.png'
import SoundOnImg from './images/SoundOn.png'
import SoundOffImg from './images/SoundOff.png'

interface Props {
    soundOn: boolean
    setSoundOn: (soundOn: boolean) => void
}

export const Header: FC<Props> = ({ soundOn, setSoundOn }) => {
    return (
        <div className={styles.header}>
            <img className={styles.header} src={LogoImg} />
            <Link to="/admin/editing" target="_blank" rel="noopener noreferrer">
                <button className={styles.header}>
                    <img className={styles.edit} src={EditImg} />
                    <h1>Редактировать сайт</h1>
                </button>
            </Link>
            <Link to="/admin/panel" target="_blank" rel="noopener noreferrer">
                <button className={styles.header} style={{ display: 'none' }}>
                    <img className={styles.edit} src={BonusImg} />
                    <h1>Бонусные программы</h1>
                </button>
            </Link>
            <div className={styles.notifications}>
                <h1>Уведомления:</h1>
                <img
                    className={styles.notifications}
                    src={soundOn ? SoundOnImg : SoundOffImg}
                    onClick={() => {
                        setSoundOn(!soundOn)
                    }}
                />
            </div>
        </div>
    )
}
