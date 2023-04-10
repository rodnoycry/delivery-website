import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/interfaces'
import { DetailsInput } from '../shared/DetailsInput'
import { formatPhoneNumber, validatePhoneNumber } from '@/functions'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    style?: CSSProperties
}

export const PhoneInput: FC<Props> = ({ inputState, setInputState, style }) => {
    return (
        <DetailsInput
            required
            inputType={'PhoneInput'}
            label={`Ваш телефон *`}
            description={`Для связи`}
            validator={validatePhoneNumber}
            formatter={formatPhoneNumber}
            inputState={inputState}
            setInputState={setInputState}
            defaultValue={'+7'}
            style={style}
        />
    )
}
