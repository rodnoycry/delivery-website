import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/redux/slices/orderSlice'
import { DetailsSelect } from '../shared/DetailsSelect'
import { getDatesOptions } from './functions'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    isVisible: boolean
    style?: CSSProperties
}

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
                options={[...getDatesOptions()]}
                inputState={inputState}
                setInputState={setInputState}
                style={style}
            />
        )
    } else {
        return null
    }
}
