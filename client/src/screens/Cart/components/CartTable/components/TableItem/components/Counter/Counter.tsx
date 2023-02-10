import React, { FC } from 'react'
import {
    Counter as DefaultCounter,
    Props as ParentProps,
} from '@shared/Counter'

export const Counter: FC<ParentProps> = ({ ...props }) => {
    return <DefaultCounter {...props} />
}
