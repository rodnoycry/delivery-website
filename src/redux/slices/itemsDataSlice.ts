import { createSlice } from '@reduxjs/toolkit'
import { getItemData } from './functions'

export interface ItemData {
    id: number
    type: string
    image: string
    name: string
    description: string
    isNew: boolean
    spiciness?: number
    qty?: number
    price: number[] | number
}

const itemDataInitialState: ItemData[] = getItemData()

export const itemDataSlice = createSlice({
    name: 'itemDataState',
    initialState: itemDataInitialState,
    reducers: {},
})
