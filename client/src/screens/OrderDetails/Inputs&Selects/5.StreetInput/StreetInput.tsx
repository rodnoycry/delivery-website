import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/interfaces'
import { DetailsInput } from '../shared/DetailsInput'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    isVisible?: boolean
    style?: CSSProperties
}

export const StreetInput: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsInput
                required
                inputType={'StreetInput'}
                label={`Улица *`}
                description={`Адрес доставки`}
                validator={(value) => !!value}
                inputState={inputState}
                setInputState={setInputState}
                style={style}
            />
        )
    } else {
        return null
    }
}
