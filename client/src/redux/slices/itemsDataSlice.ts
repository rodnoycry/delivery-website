import { createSlice } from '@reduxjs/toolkit'
import { ItemData } from '@/interfaces'

const itemDataInitialState: ItemData[] = []

export const itemDataSlice = createSlice({
    name: 'itemDataState',
    initialState: itemDataInitialState,
    reducers: {},
})
