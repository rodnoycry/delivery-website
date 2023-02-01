import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ItemState {
    id: number
    selected: number
}

export interface State {
    itemsStates: Record<string, ItemState>
}

const initialState: State = {
    itemsStates: {},
}

const itemsStatesSlice = createSlice({
    name: 'itemsStates',
    initialState,
    reducers: {
        updateItemState: (state, action: PayloadAction<ItemState>) => {
            state.itemsStates[action.payload.id] = action.payload
        },
    },
})

export const { updateItemState } = itemsStatesSlice.actions

export const store = configureStore({
    reducer: itemsStatesSlice.reducer,
})
