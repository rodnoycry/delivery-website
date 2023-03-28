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

export const EntranceInput: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsInput
                inputType={'EntranceInput'}
                label={`Подъезд`}
                description={`Номер подъезда`}
                validator={(value) => !!value}
                inputState={inputState}
                setInputState={setInputState}
                placeholder={'При наличии'}
                style={style}
            />
        )
    } else {
        return null
    }
}
