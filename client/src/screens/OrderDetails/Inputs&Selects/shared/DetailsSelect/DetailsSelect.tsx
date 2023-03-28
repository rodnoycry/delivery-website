import React, { useState, useEffect, CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './DetailsSelect.module.css'
import { InputState } from '@/interfaces'
import Select, { StylesConfig } from 'react-select'

interface Props {
    inputType: string
    label: string
    description: string
    options: Array<{ value: string; label: string }>
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    preDefinedSetInputState?: (selectedOptionData: unknown) => void
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
    preDefinedSetInputState,
    style,
}) => {
    const [selected, setSelected] = useState(options[0])
    useEffect(() => {
        if (inputState?.selected) {
            if (inputType === 'DaySelect') {
                const hasOption = options.some(
                    (option) => option.value === inputState.selected?.value
                )
                if (!hasOption) {
                    setInputState('DaySelect', {
                        selected: options[0],
                    })
                    setSelected(options[0])
                } else {
                    setSelected(inputState.selected)
                }
            } else {
                setSelected(inputState.selected)
            }
        }
    }, [inputState])

    const handleChange = (selectedOptionData: unknown): void => {
        setSelected(selectedOptionData as (typeof options)[0])
        if (preDefinedSetInputState) {
            preDefinedSetInputState(selectedOptionData)
        } else {
            setInputState(inputType, {
                selected: selectedOptionData as (typeof options)[0],
            })
        }
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
