import React, { useState, CSSProperties, useEffect } from 'react'
import type { FC } from 'react'
import styles from './DetailsInput.module.css'
import { InputState } from '@/redux/slices/orderSlice'

interface Props {
    required?: boolean
    inputType: string
    label: string
    description: string
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    formatter?: (input: string) => string
    validator?: (input: string) => boolean
    defaultValue?: string
    placeholder?: string
    style?: CSSProperties
}

export const DetailsInput: FC<Props> = ({
    required = false,
    inputType,
    label,
    description,
    inputState,
    setInputState,
    formatter = (input) => input.slice(0, 80),
    validator = (input) => true,
    defaultValue = '',
    placeholder = '',
    style,
}) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [value, setValue] = useState<string>(
        inputState?.value ? inputState.value : defaultValue
    )
    const [isRed, setIsRed] = useState<boolean>(
        inputState?.isRed ? inputState.isRed : false
    )
    useEffect(() => {
        if (inputState) {
            if (inputType !== 'TimeInput') {
                setValue(inputState?.value as string)
                setIsRed(inputState?.isRed as boolean)
            }
        }
    }, [inputState?.value, inputState?.isRed])

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue = event.target.value
        const formattedValue = formatter(inputValue)
        setInputState(inputType, { value: formattedValue })
        setValue(formattedValue)
    }
    return (
        <div className={styles.input} style={style}>
            <div>
                <h1 className={styles.input}>{label}</h1>
                <h4 className={styles.input}>{description}</h4>
            </div>
            <input
                className={styles.input}
                type="text"
                placeholder={placeholder}
                onChange={handleInputChange}
                onBlur={() => {
                    const isError = !validator(value)
                    setIsError(isError)
                    setInputState(inputType, {
                        hasError: isError && required,
                        isRed: isError && required,
                        onFocus: false,
                    })
                }}
                onFocus={() => {
                    setIsError(false)
                    setInputState(inputType, {
                        onFocus: true,
                        isRed: isError,
                    })
                }}
                value={value || defaultValue}
                style={{ borderColor: isRed ? '#AA000A' : '' }}
            />
        </div>
    )
}
