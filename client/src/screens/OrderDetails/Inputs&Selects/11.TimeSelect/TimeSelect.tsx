import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/interfaces'
import { DetailsSelect } from '../shared/DetailsSelect'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    label: string
    style?: CSSProperties
}

export const options = [
    { value: 'По готовности', label: 'По готовности' },
    { value: 'Ко времени', label: 'Ко времени' },
]

export const TimeSelect: FC<Props> = ({
    inputState,
    setInputState,
    label,
    style,
}) => {
    return (
        <DetailsSelect
            inputType={'TimeSelect'}
            label={label}
            description={`Для вашего удобства`}
            options={label === 'Время самовывоза *' ? [options[1]] : options}
            inputState={inputState}
            setInputState={setInputState}
            style={style}
        />
    )
}
