import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/interfaces'
import { DetailsSelect } from '../shared/DetailsSelect'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    style?: CSSProperties
}

const options = [
    { value: '1 человек', label: '1 человек' },
    { value: '2 человека', label: '2 человека' },
    { value: '3 человека', label: '3 человека' },
    { value: '4 человека', label: '4 человека' },
    { value: '5 человек', label: '5 человек' },
    { value: '6 человек', label: '6 человек' },
    { value: '7 человек', label: '7 человек' },
    { value: '8 человек', label: '8 человек' },
    { value: '9 человек', label: '9 человек' },
    { value: '10 людей и более', label: '10 людей и более' },
]

export const PersonQtySelect: FC<Props> = ({
    inputState,
    setInputState,
    style,
}) => {
    return (
        <DetailsSelect
            inputType={'PersonQtySelect'}
            label={`Количество персон *`}
            description={`Мы приготовим приборы для всех`}
            options={options}
            inputState={inputState}
            setInputState={setInputState}
            style={style}
        />
    )
}
