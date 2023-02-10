import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/redux/slices/orderSlice'
import { DetailsInput } from '../shared/DetailsInput'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    isVisible?: boolean
    style?: CSSProperties
}

export const TimeInput: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsInput
                inputType={'TimeInput'}
                label={`Доставить к *`}
                description={`Укажите время`}
                validator={(value) => !!value}
                inputState={inputState}
                setInputState={setInputState}
                defaultValue={'18:00'}
                style={style}
            />
        )
    } else {
        return null
    }
}
