import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemState {
    id: number
    selected: number
}

const itemsStatesInitialState: Record<number, ItemState> = {}

export const itemsStatesSlice = createSlice({
    name: 'itemsStates',
    initialState: itemsStatesInitialState,
    reducers: {
        updateItemState: (state, action: PayloadAction<ItemState>) => {
            state[action.payload.id] = action.payload
        },
    },
})
