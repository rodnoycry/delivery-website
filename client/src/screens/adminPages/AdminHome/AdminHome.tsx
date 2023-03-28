import React, { CSSProperties, FC } from 'react'

import { Home } from '../../shared/Home'

interface Props {
    search?: string
    style?: CSSProperties
}

export const AdminHome: FC<Props> = ({ search = '', style }) => {
    return (
        <Home
            resetSearch={() => {}}
            isAdmin={true}
            search={search}
            style={style}
        />
    )
}
