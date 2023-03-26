import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type WindowName = 'login'

const windowsStatesInitialState = {
    login: false,
}

export const windowsStatesSlice = createSlice({
    name: 'windowsStates',
    initialState: windowsStatesInitialState,
    reducers: {
        updateLoginWindowState: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload
        },
    },
})
