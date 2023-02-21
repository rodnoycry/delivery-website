import { createSlice } from '@reduxjs/toolkit'
import { getItemData } from './functions'
import { ItemData } from '@/interfaces'

const itemDataInitialState: ItemData[] = getItemData()

export const itemDataSlice = createSlice({
    name: 'itemDataState',
    initialState: itemDataInitialState,
    reducers: {},
})
