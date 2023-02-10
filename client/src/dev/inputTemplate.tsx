import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import { isValidPhoneNumber } from 'libphonenumber-js'
import styles from '../../OrderDetails.module.css'
import { formatPhoneNumber } from './functions'

interface Props {
    mergeError: (error: Record<string, boolean>) => void
    style?: CSSProperties
}

export const PhoneInput: FC<Props> = ({ mergeError, style }) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [value, setValue] = useState<string>('+7')

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue = event.target.value
        const formattedValue = formatPhoneNumber(inputValue)
        setValue(formattedValue)
    }
    return (
        <div className={styles.input}>
            <div>
                <h1 className={styles.input}>Ваш телефон *</h1>
                <h4 className={styles.input}>Для связи</h4>
            </div>
            <input
                className={styles.input}
                type="text"
                onChange={handleInputChange}
                onBlur={() => {
                    const isError =
                        !isValidPhoneNumber(value) && value.length > 2
                    setIsError(isError)
                    mergeError({ PhoneInput: isError })
                }}
                onFocus={() => {
                    setIsError(false)
                    mergeError({ PhoneInput: false })
                }}
                value={value}
                style={{ borderColor: isError ? '#AA000A' : '' }}
            />
        </div>
    )
}
