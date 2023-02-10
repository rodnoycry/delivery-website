import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './Template.module.css'

interface Props {
    style?: CSSProperties
}

export const Template: FC<Props> = ({ style }) => {
    return (
        <div>
            <h1>Template</h1>
        </div>
    )
}
