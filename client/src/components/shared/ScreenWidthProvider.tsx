import React, { useState, useEffect, FC } from 'react'
import {
    ScreenSizeContext,
    ScreenSizeContextValue,
    Breakpoints,
} from '@/utils/ScreenWidthContext'
import { DeviceType } from '@/utils'

interface Props {
    children: React.ReactNode
}

export const ScreenSizeProvider: FC<Props> = ({ children }) => {
    const [screenSize, setScreenSize] = useState<ScreenSizeContextValue>({
        width: window.innerWidth,
        deviceType:
            window.innerWidth >= Breakpoints.Tablet
                ? DeviceType.Desktop
                : window.innerWidth >= Breakpoints.Mobile
                ? DeviceType.Tablet
                : DeviceType.Mobile,
    })

    useEffect(() => {
        const handleResize = (): void => {
            setScreenSize({
                width: window.innerWidth,
                deviceType:
                    window.innerWidth > Breakpoints.Tablet
                        ? DeviceType.Desktop
                        : window.innerWidth > Breakpoints.Mobile
                        ? DeviceType.Tablet
                        : DeviceType.Mobile,
            })
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <ScreenSizeContext.Provider value={screenSize}>
            {children}
        </ScreenSizeContext.Provider>
    )
}
