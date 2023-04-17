import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { SnapItem } from 'react-snaplist-carousel'
import styles from './BlankItem.module.css'
import AddImage from './images/Add.png'

interface Props {
    setIsAdding: (isAdding: boolean) => void
    style?: CSSProperties
}

export const BlankItem: FC<Props> = ({ setIsAdding, style }) => {
    return (
        <SnapItem margin={{ right: '30px' }} snapAlign="center">
            <button
                className={styles.addItem}
                style={style}
                onClick={() => {
                    setIsAdding(true)
                }}
            >
                <img className={styles.addItem} src={AddImage} />
            </button>
        </SnapItem>
    )
}
