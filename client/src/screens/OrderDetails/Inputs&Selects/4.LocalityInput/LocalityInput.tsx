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

export const LocalityInput: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsInput
                required
                inputType={'LocalityInput'}
                label={`Населённый пункт *`}
                description={`Информация для доставки`}
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
