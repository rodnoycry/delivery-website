import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/redux/slices/orderSlice'
import { DetailsSelect } from '../shared/DetailsSelect'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    style?: CSSProperties
}

const options = [
    { value: 'На указанный адрес', label: 'На указанный адрес' },
    { value: 'Самовывоз', label: 'Самовывоз' },
]

export const DeliveryTypeSelect: FC<Props> = ({
    inputState,
    setInputState,
    style,
}) => {
    return (
        <DetailsSelect
            inputType={'DeliveryTypeSelect'}
            label={`Тип доставки *`}
            description={`Самовывоз или доставка`}
            options={options}
            inputState={inputState}
            setInputState={setInputState}
            style={style}
        />
    )
}
