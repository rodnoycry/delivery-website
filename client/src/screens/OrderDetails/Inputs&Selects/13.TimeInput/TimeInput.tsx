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
    const now = new Date()
    now.setHours(now.getHours() + 1)

    const hour = now.getHours().toString().padStart(2, '0')
    const minute = now.getMinutes().toString().padStart(2, '0')

    const time = `${hour}:${minute}`

    if (isVisible) {
        return (
            <DetailsInput
                inputType={'TimeInput'}
                label={`Доставить к *`}
                description={`Укажите время`}
                validator={(value) => !!value}
                inputState={inputState}
                setInputState={setInputState}
                defaultValue={time}
                style={style}
            />
        )
    } else {
        return null
    }
}
