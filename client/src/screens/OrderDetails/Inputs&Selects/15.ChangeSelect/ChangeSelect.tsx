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
    { value: 'Со сдачей', label: 'Со сдачей' },
    { value: 'Без сдачи', label: 'Без сдачи' },
]

export const ChangeSelect: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsSelect
                inputType={'ChangeSelect'}
                label={`Детали оплаты наличными *`}
                description={`Выберите будет ли сдача`}
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
