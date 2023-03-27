import React, { CSSProperties, FC } from 'react'

import { Home } from '../shared/Home'

interface Props {
    search: string
    resetSearch: () => void
    style?: CSSProperties
}

export const UserHome: FC<Props> = ({ search, resetSearch, style }) => {
    return (
        <Home
            isAdmin={false}
            search={search}
            resetSearch={resetSearch}
            style={style}
        />
    )
}
