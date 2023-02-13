import React from 'react'
import type { FC } from 'react'
import { LegalTemplate } from '../shared/LegalTemplate'
import offerText from './offer.txt'

export const Offer: FC = () => {
    return (
        <LegalTemplate
            label="Публичная оферта о продаже товаров дистанционным способом"
            text={offerText}
        />
    )
}
