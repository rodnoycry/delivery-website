import { DeviceType } from '@/utils'
import React from 'react'

export interface ScreenSizeContextValue {
    width: number
    deviceType: DeviceType
}

const defaultValue: ScreenSizeContextValue = {
    width: window.innerWidth,
    deviceType: DeviceType.Desktop,
}

export const Breakpoints = {
    Mobile: 700,
    Tablet: 1000,
}

export const ScreenSizeContext = React.createContext(defaultValue)
