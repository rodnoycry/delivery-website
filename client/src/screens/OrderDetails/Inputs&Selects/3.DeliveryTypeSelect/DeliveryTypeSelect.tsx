import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputStates } from '@/redux/slices/inputStatesSlice'
import { InputState } from '@/interfaces'
import { DetailsSelect } from '../shared/DetailsSelect'
import { options as timeSelectOptions } from '../11.TimeSelect'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    setInputStateWithAffect: (
        newStatePart: Record<keyof InputStates, InputState>
    ) => void
    style?: CSSProperties
}

const options = [
    { value: 'На указанный адрес', label: 'На указанный адрес' },
    { value: 'Самовывоз', label: 'Самовывоз' },
]

export const DeliveryTypeSelect: FC<Props> = ({
    inputState,
    setInputState,
    setInputStateWithAffect,
    style,
}) => {
    const preDefinedSetInputState = (selectedOptionData: unknown): void => {
        const newInputStatePart: Record<string, any> = {
            DeliveryTypeSelect: {
                selected: selectedOptionData as {
                    label: string
                    value: string
                },
            },
        }
        if (JSON.stringify(selectedOptionData) === JSON.stringify(options[0])) {
            newInputStatePart.TimeSelect = {
                selected: timeSelectOptions[0],
            }
        } else {
            newInputStatePart.TimeSelect = {
                selected: timeSelectOptions[1],
            }
        }
        setInputStateWithAffect(newInputStatePart)
    }
    return (
        <DetailsSelect
            inputType={'DeliveryTypeSelect'}
            label={`Тип доставки *`}
            description={`Самовывоз или доставка`}
            options={options}
            inputState={inputState}
            setInputState={setInputState}
            preDefinedSetInputState={preDefinedSetInputState}
            style={style}
        />
    )
}
