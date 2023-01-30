import React from 'react'
import type { FC } from 'react'
import styles from './Footer.module.css'

interface Props {
    style?: object
}

export const Footer: FC<Props> = ({ style }) => {
    return (
        <footer className={styles.footer} style={style}>
            <hr style={{ border: '1px solid #313131' }} />
        </footer>
    )
}
