import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/redux/slices/orderSlice'
import { DetailsSelect } from '../shared/DetailsSelect'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    isVisible: boolean
    style?: CSSProperties
}

const options = [
    { value: '10 февраля', label: '10 февраля' },
    { value: '11 февраля', label: '11 февраля' },
    { value: '12 февраля', label: '12 февраля' },
    { value: '13 февраля', label: '13 февраля' },
    { value: '14 февраля', label: '14 февраля' },
    { value: '15 февраля', label: '15 февраля' },
    { value: '16 февраля', label: '16 февраля' },
]

export const DaySelect: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsSelect
                inputType={'DaySelect'}
                label={`Дата доставки *`}
                description={`Укажите день`}
                options={options}
                inputState={inputState}
                setInputState={setInputState}
                style={style}
            />
        )
    } else {
        return null
    }
}
