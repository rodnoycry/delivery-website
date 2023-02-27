import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface InputState {
    value?: string
    selected?: {
        label: string
        value: string
    }
    hasError?: boolean
    isRed?: boolean
    onFocus?: boolean
}

export interface Zone {
    zone: 'Талдом' | 'Северный/Юркино' | 'До 15 км'
}

type InputStates = Record<string, InputState>

export type Order = Zone & InputStates

const createDefaultInputStates = (
    inputNames: string[]
): Record<string, InputState> => {
    const defaultInputStates: Record<string, InputState> = {}
    inputNames.forEach(
        (inputName) =>
            (defaultInputStates[inputName] = {
                value: '',
                hasError: false,
                isRed: false,
                onFocus: false,
            })
    )
    return defaultInputStates
}

const createDefaultSelectStates = (
    selectDataArr: Record<string, string>
): Record<string, InputState> => {
    const defaultInputStates: Record<string, InputState> = {}
    Object.entries(selectDataArr).forEach(
        ([selectName, defaultValue]) =>
            (defaultInputStates[selectName] = {
                selected: {
                    label: defaultValue,
                    value: defaultValue,
                },
            })
    )
    return defaultInputStates
}

const defaultInputStates = createDefaultInputStates([
    'PhoneInput',
    'NameInput',
    'LocalityInput',
    'StreetInput',
    'HouseInput',
    'ApartmentInput',
    'EntranceInput',
    'IntercomInput',
])
const defaultSelectorStates = createDefaultSelectStates({
    DeliveryTypeSelect: 'На указанный адрес',
    PersonQtySelect: '1 человек',
    TimeSelect: 'По готовности',
    DaySelect: '10 февраля',
    PaymentSelect: 'Банковской картой курьеру',
    ChangeSelect: 'Со сдачей',
})

const ordersInitialState: Order | Record<string, any> = {
    zone: 'Талдом',
    ...defaultInputStates,
    ...defaultSelectorStates,
}

export const orderSlice = createSlice({
    name: 'orderState',
    initialState: ordersInitialState,
    reducers: {
        updateOrder: (
            state,
            action: PayloadAction<Order | Record<string, any>>
        ) => {
            const newOrderData = action.payload
            Object.entries(newOrderData).forEach(([key, value]) => {
                state[key] = value
            })
        },
    },
})
