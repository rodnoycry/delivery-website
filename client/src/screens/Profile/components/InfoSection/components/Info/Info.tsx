import React, { useState, useEffect, CSSProperties } from 'react'
import type { FC } from 'react'
import styles from './Info.module.css'
import { CompleteInfo, EditingInfo, EmptyInfo } from './components'

interface Props {
    name: string
    value: string | undefined
    isPhone?: boolean
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
    value: parentValue,
    isPhone,
    image,
    isEditable,
    onUpdate,
    style,
}) => {
    const [mode, setMode] = useState<Mode>(
        parentValue ? Mode.Complete : Mode.Empty
    )
    const [value, setValue] = useState<string | undefined>(parentValue)
    useEffect(() => {
        setValue(parentValue)
        setMode(parentValue ? Mode.Complete : Mode.Empty)
    }, [parentValue])
    return mode === Mode.Complete ? (
        <CompleteInfo
            name={name}
            value={value ?? ''}
            isEditable={isEditable}
            onStartEdit={() => {
                setMode(Mode.Editing)
            }}
        />
    ) : mode === Mode.Editing ? (
        <>
            {isEditable && onUpdate ? (
                <EditingInfo
                    value={value ?? ''}
                    isPhone={isPhone}
                    onCancel={(parentValue: string) => {
                        if (parentValue) {
                            setMode(Mode.Complete)
                        } else {
                            setMode(Mode.Empty)
                        }
                    }}
                    onSubmit={(value: string) => {
                        onUpdate(value)
                        if (value) {
                            setMode(Mode.Complete)
                        } else {
                            setMode(Mode.Empty)
                        }
                    }}
                />
            ) : null}
        </>
    ) : (
        <EmptyInfo
            name={name}
            image={image}
            onClick={() => {
                if (isEditable) {
                    setMode(Mode.Editing)
                }
            }}
        />
    )
}
