import React from 'react'
import type { FC } from 'react'
import { LegalTemplate } from '../shared/LegalTemplate'
import termsText from './terms.txt'

export const Terms: FC = () => {
    return (
        <LegalTemplate label="Пользовательское соглашение" text={termsText} />
    )
}
