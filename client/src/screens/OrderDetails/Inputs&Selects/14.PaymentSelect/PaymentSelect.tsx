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
    { value: 'Банковской картой курьеру', label: 'Банковской картой курьеру' },
    { value: 'Наличными', label: 'Наличными' },
]

export const PaymentSelect: FC<Props> = ({
    inputState,
    setInputState,
    isVisible,
    style,
}) => {
    if (isVisible) {
        return (
            <DetailsSelect
                inputType={'PaymentSelect'}
                label={`Оплата *`}
                description={`Выберите способ`}
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
