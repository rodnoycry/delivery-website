import React, { CSSProperties, FC } from 'react'

import { Home } from '../shared/Home'

interface Props {
    search: string
    style?: CSSProperties
}

export const UserHome: FC<Props> = ({ search, style }) => {
    return <Home isAdmin={false} search={search} style={style} />
}
