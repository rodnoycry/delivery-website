import React from 'react'
import type { FC } from 'react'
import { LegalTemplate } from '../shared/LegalTemplate'
import policyText from './policy.txt'

export const DataPolicy: FC = () => {
    return (
        <LegalTemplate
            label="Политика обработки персональных данных"
            text={policyText}
        />
    )
}
