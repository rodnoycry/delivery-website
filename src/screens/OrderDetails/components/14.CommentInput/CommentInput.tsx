import React, { CSSProperties } from 'react'
import type { FC } from 'react'
import { InputState } from '@/redux/slices/orderSlice'
import { DetailsInput } from '../shared/DetailsInput'

interface Props {
    inputState: InputState
    setInputState: (input: string, value: InputState) => void
    style?: CSSProperties
}

export const CommentInput: FC<Props> = ({
    inputState,
    setInputState,
    style,
}) => {
    return (
        <DetailsInput
            inputType={'CommentInput'}
            label={`Комментарий`}
            description={`Информация для нашего персонала`}
            inputState={inputState}
            setInputState={setInputState}
            style={style}
        />
    )
}
