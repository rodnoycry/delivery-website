import React, { useState, CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './Info.module.css'
import { EmptyInfo } from './components'

interface Props {
    name: string
    value: string | undefined
    image: string
    isEditable: boolean
    onUpdate?: (value: string) => void
    style?: CSSProperties
}

enum Mode {
    Empty,
    Editing,
    Complete,
}

export const Info: FC<Props> = ({
    name,
    value,
    image,
    isEditable,
    onUpdate,
    style,
}) => {
    const [mode, setMode] = useState<Mode>(Mode.Empty)
    return <div style={style}>Info</div>
}
