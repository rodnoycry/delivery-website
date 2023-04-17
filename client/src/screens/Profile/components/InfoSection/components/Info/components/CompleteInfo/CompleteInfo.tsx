import React from 'react'
import type { FC } from 'react'
import styles from './CompleteInfo.module.css'
import EditImg from './images/Edit.png'

interface Props {
    name: string
    value: string
    isEditable: boolean
    onStartEdit: () => void
}

export const CompleteInfo: FC<Props> = ({
    name,
    value,
    isEditable,
    onStartEdit,
}) => {
    return (
        <div>
            <div className={styles.firstLine}>
                <h4>{name}</h4>
                {isEditable ? (
                    <img
                        className={styles.editIcon}
                        src={EditImg}
                        onClick={onStartEdit}
                    />
                ) : null}
            </div>
            <h3 className={styles.value}>{value}</h3>
        </div>
    )
}
