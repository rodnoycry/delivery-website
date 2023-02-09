import React, { useState, CSSProperties, useEffect } from 'react'
import type { FC } from 'react'
import styles from './DetailsSelect.module.css'
import { InputState } from '@/redux/slices/orderSlice'
import Select, { StylesConfig } from 'react-select'

interface Props {
    inputType: string
    label: string
    description: string
    options: Array<{ value: string; label: string }>
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    style?: CSSProperties
}

const stylesConfig: StylesConfig = {
    control: (styles) => ({
        ...styles,
        border: 'none',
        borderRadius: 9,
        height: 50,
        cursor: 'pointer',
    }),
    singleValue: (styles) => ({
        ...styles,
        marginLeft: 15,
    }),
}

export const DetailsSelect: FC<Props> = ({
    inputType,
    label,
    description,
    options,
    inputState,
    setInputState,
    style,
}) => {
    const [selected, setSelected] = useState(
        inputState?.value ? inputState.value : options[0]
    )

    useEffect(() => {
        if (inputState) {
            setSelected(inputState?.selected ? inputState.selected : options[0])
        }
    }, [inputState])

    const handleChange = (selectedOptionData: unknown): void => {
        setSelected(selectedOptionData as (typeof options)[0])
        setInputState(inputType, {
            selected: selectedOptionData as (typeof options)[0],
        })
    }
    return (
        <div className={styles.input} style={style}>
            <div>
                <h1 className={styles.input}>{label}</h1>
                <h4 className={styles.input}>{description}</h4>
            </div>
            <div className={styles.dropdown} style={style}>
                <Select
                    className={styles.selector}
                    options={options}
                    onChange={handleChange}
                    styles={stylesConfig}
                    isSearchable={false}
                    defaultValue={options[0]}
                    value={selected}
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
        </div>
    )
}
