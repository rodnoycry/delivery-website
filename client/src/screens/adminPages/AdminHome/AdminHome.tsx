import React, { CSSProperties, FC } from 'react'

import { Home } from '../../shared/Home'

interface Props {
    style?: CSSProperties
}

export const AdminHome: FC<Props> = ({ style }) => {
    return <Home isAdmin={true} search={''} style={style} />
}
