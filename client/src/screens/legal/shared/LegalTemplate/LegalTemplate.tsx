import React from 'react'
import type { FC } from 'react'
import styles from './LegalTemplate.module.css'

const fetchData = async (): Promise<string> => {
    try {
        const response = await fetch('./offer.txt')
        const text = await response.text()
        return text
    } catch (error) {
        console.error(error)
        return ''
    }
}

interface Props {
    label: string
    text: string
}

export const LegalTemplate: FC<Props> = ({ label, text }) => {
    return (
        <div className={styles.legal}>
            <h1 className={styles.legal}>{label}</h1>
            <p
                className={styles.legal}
                dangerouslySetInnerHTML={{
                    __html: text.replace(/\n/g, '<br />'),
                }}
            />
        </div>
    )
}
