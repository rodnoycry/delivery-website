import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ServerItemData } from '@/interfaces'

const itemStatesInitialState: ServerItemData[] = []

export const itemsDataSlice = createSlice({
    name: 'itemsDataStore',
    initialState: itemStatesInitialState,
    reducers: {
        setItemsData: (state, action: PayloadAction<ServerItemData[]>) => {
            state.splice(0, state.length)
            action.payload.forEach((item) => {
                state.push(item)
            })
        },
    },
})
