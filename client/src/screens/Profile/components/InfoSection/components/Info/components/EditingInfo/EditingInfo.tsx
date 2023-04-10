import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { formatPhoneNumber, validatePhoneNumber } from '@/functions'
import styles from './EditingInfo.module.css'

interface Props {
    value: string
    isPhone?: boolean
    onCancel: (parentValue: string) => void
    onSubmit: (value: string) => void
}

export const EditingInfo: FC<Props> = ({
    value: parentValue,
    isPhone,
    onCancel,
    onSubmit,
}) => {
    const [value, setValue] = useState<string>('')
    const [hasError, setHasError] = useState<boolean>(false)
    useEffect(() => {
        setValue(isPhone && !parentValue ? '+7' : parentValue)
    }, [parentValue])
    return (
        <div className={styles.editingInfo}>
            <input
                className={styles.input}
                type="text"
                value={value}
                placeholder="Вводите сюда"
                style={{
                    border: hasError
                        ? '2px solid #FF000A'
                        : '2px solid #3D3D3D',
                }}
                onBlur={() => {
                    if (isPhone) {
                        const isValid = validatePhoneNumber(value)
                        setHasError(!isValid)
                    }
                }}
                onFocus={() => {
                    if (isPhone) {
                        setHasError(false)
                    }
                }}
                onChange={(e) => {
                    let value = e.target.value.slice(0, 30)
                    if (!isPhone) {
                        setValue(value)
                    } else {
                        value = formatPhoneNumber(value)
                        setValue(value)
                    }
                }}
            />
            <span
                className={styles.textButton}
                onClick={() => {
                    if (!hasError) {
                        onSubmit(value)
                    }
                }}
            >
                ✅
            </span>
            <span
                className={styles.textButton}
                onClick={() => {
                    onCancel(parentValue)
                }}
            >
                ❌
            </span>
        </div>
    )
}
