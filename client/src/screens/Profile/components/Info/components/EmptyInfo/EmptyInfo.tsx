import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './EmptyInfo.module.css'

interface Props {
    name: string
    image: string
    onClick: () => void
    style?: CSSProperties
}

export const EmptyInfo: FC<Props> = ({ name, image, onClick, style }) => {
    return (
        <button className={styles.button} onClick={onClick} style={style}>
            <h4 className={styles.name}>{name}</h4>
            <img className={styles.image} src={image} />
        </button>
    )
}
