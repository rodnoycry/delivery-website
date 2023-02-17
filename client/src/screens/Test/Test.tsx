import React, { useState } from 'react'
import type { FC } from 'react'
import { sendDataToServer } from '@/services/apiService'
import styles from './Test.module.css'

export const Test: FC = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [response, setResponse] = useState<any>()

    const handleNameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue = event.target.value
        setName(inputValue)
    }

    const handleEmailInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const inputValue = event.target.value
        setEmail(inputValue)
    }

    const handleSubmit = (): void => {
        const response_ = sendDataToServer({ name, email })
        setResponse(response_)
    }
    return (
        <div className={styles.test}>
            <input
                className={styles.test}
                value={name}
                name="name"
                placeholder="Name"
                onChange={handleNameInputChange}
            />
            <input
                className={styles.test}
                style={{ marginLeft: 100 }}
                value={email}
                name="email"
                placeholder="Email"
                onChange={handleEmailInputChange}
            />
            <button className={styles.test} onClick={handleSubmit}>
                Send to server
            </button>
            <p>{typeof response}</p>
        </div>
    )
}
