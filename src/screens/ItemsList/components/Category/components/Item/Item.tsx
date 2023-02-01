import React from 'react'
import type { FC } from 'react'
import styles from './Item.module.css'
import { Selector } from './components/Selector/Selector'

interface ItemData {
    id: number
    type: string
    image: string
    name: string
    description: string
    isNew: boolean
    spiciness: number
    price: number | number[]

    selected: number | false
}

interface Props extends ItemData {}

export const Item: FC<Props> = ({
    id,
    type,
    image,
    name,
    description,
    isNew,
    spiciness,
    price,
    selected,
}) => {
    return (
        <li className={styles.item} key={id}>
            <img className={styles.item} src={image} />
            {isNew ? <div>New</div> : null}
            <h1 className={styles.item}>{name}</h1>
            <p className={styles.item}>{description}</p>
            <Selector type={type} selected={selected} itemId={id} />
        </li>
    )
}
