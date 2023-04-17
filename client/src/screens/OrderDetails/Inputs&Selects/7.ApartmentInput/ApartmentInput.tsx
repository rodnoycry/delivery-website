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

export const ApartmentInput: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsInput
                inputType={'ApartmentInput'}
                label={`Квартира`}
                description={`Или номер офиса`}
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
