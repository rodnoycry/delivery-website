import React from 'react'
import type { FC } from 'react'
import styles from './Test.module.css'

interface TestProps {
    name: string
}

export const Test: FC<TestProps> = ({ name }) => {
    return <h1 className={styles.button}>{`Hello ${name}!`}</h1>
}
