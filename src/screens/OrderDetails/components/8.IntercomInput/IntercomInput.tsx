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

export const IntercomInput: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsInput
                inputType={'IntercomInput'}
                label={`Код двери`}
                description={`Домофон`}
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
