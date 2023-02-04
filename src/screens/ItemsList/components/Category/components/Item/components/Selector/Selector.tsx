import React, { useState } from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { updateItemState } from '@/redux/store'
import styles from './Selector.module.css'

interface Props {
    type: string
    itemId: number
    setItemSelected: (selected: number) => void
    selected?: number | false
    style?: object
}

const selectorsData = {
    pizza: [
        {
            id: 0,
            title: '25 см',
        },
        {
            id: 1,
            title: '33 см',
        },
        {
            id: 2,
            title: '40 см',
        },
    ],
    wok: [
        {
            id: 0,
            title: '25 см',
        },
        {
            id: 1,
            title: '33 см',
        },
        {
            id: 2,
            title: '40 см',
        },
    ],
}

export const Selector: FC<Props> = ({
    type,
    selected: selected_,
    itemId,
    setItemSelected,
    style,
}) => {
    const defaultSelected = selected_ !== false ? selected_ : 1
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(defaultSelected)
    const onSelectedChange = (itemId: number, selectorId: number): void => {
        setSelected(selectorId)
        setItemSelected(selectorId)
        dispatch(updateItemState({ id: itemId, selected: selectorId }))
    }
    if (type !== 'pizza' && type !== 'wok') {
        return null
    }
    const curSelectorsData = selectorsData[type]
    return (
        <ul className={styles.selector}>
            {curSelectorsData.map(({ id: selectorId, title }) => {
                return (
                    <li
                        key={selectorId}
                        className={styles.selector}
                        style={{
                            ...style,
                            backgroundColor:
                                selected === selectorId ? 'white' : 'grey',
                        }}
                        onClick={() => {
                            onSelectedChange(itemId, selectorId)
                        }}
                    >
                        <span className={styles.selector}>{title}</span>
                    </li>
                )
            })}
        </ul>
    )
}
