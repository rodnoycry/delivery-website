import React, { useState, useEffect, CSSProperties } from 'react'
import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateInputStates, ReduxStore } from '@/redux/store'
import { InputStates, Zone } from '@/redux/slices/inputStatesSlice'
import Select from 'react-select'
import type { StylesConfig } from 'react-select'
import styles from './Dropdown.module.css'

interface Props {
    setZone: (zone: InputStates['zone']) => void
    style?: CSSProperties
}

const options = [
    { value: 'Талдом', label: 'Талдом' },
    { value: 'Северный/Юркино', label: 'Северный/Юркино' },
    { value: 'До 15 км', label: 'До 15 км' },
]

const stylesConfig: StylesConfig = {
    control: (styles) => ({
        ...styles,
        border: 'none',
        borderRadius: 16,
        height: 50,
        cursor: 'pointer',
    }),
    singleValue: (styles) => ({
        ...styles,
        marginLeft: 15,
    }),
}

export const Dropdown: FC<Props> = ({ setZone, style }) => {
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [selectedOptionData, setSelectedOptionData] = useState(options[0])
    const handleChange = (selectedOptionData: unknown): void => {
        setSelectedOptionData(selectedOptionData as (typeof options)[0])
    }
    const dispatch = useDispatch()
    const order = useSelector((state: ReduxStore) => state.inputStatesStore)

    useEffect(() => {
        setZone(selectedOptionData.value as InputStates['zone'])
        if (order.zone !== undefined && !isFirstRender) {
            dispatch(
                updateInputStates({
                    zone: selectedOptionData.value as unknown as Zone['zone'],
                })
            )
        }
    }, [selectedOptionData])

    useEffect(() => {
        if (order.zone !== undefined) {
            options.forEach((option) => {
                if (option.value === order.zone) {
                    setSelectedOptionData(option)
                    setIsFirstRender(false)
                }
            })
        }
    }, [order.zone])
    return (
        <div className={styles.dropdown} style={style}>
            <Select
                className={styles.selector}
                options={options}
                onChange={handleChange}
                styles={stylesConfig}
                isSearchable={false}
                defaultValue={options[0]}
                value={selectedOptionData}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        neutral0: '#3e3e3e',
                        neutral80: '#fafafa',
                        primary: '#FAFAFA',
                        primary25: '#5e5e5e',
                        primary50: '#6e6e7e',
                    },
                })}
            />
        </div>
    )
}
