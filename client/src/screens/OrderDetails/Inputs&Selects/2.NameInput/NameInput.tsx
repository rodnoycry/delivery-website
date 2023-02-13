import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/redux/slices/orderSlice'
import { DetailsInput } from '../shared/DetailsInput'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    style?: CSSProperties
}

export const NameInput: FC<Props> = ({ inputState, setInputState, style }) => {
    return (
        <DetailsInput
            required
            inputType={'NameInput'}
            label={`Ваше имя *`}
            description={`Как к Вам обращаться`}
            validator={(value) => !!value}
            inputState={inputState}
            setInputState={setInputState}
            style={style}
        />
    )
}
