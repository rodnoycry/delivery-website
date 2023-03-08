import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './BlankItem.module.css'

interface Props {
    style?: CSSProperties
}

export const BlankItem: FC<Props> = ({ style }) => {
    return <div className={styles.blankItem} style={style} />
}
