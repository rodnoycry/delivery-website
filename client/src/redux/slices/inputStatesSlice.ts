import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getCurrentDayRussian } from '@/functions'
import { InputState } from '@/interfaces'

export interface Zone {
    zone: 'Талдом' | 'Северный/Юркино' | 'До 15 км'
}

export type InputStates = Zone & Record<string, InputState>

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
    DaySelect: getCurrentDayRussian(),
    PaymentSelect: 'Банковской картой курьеру',
    ChangeSelect: 'Со сдачей',
})

const ordersInitialState: InputStates | Record<string, any> = {
    zone: 'Талдом',
    ...defaultInputStates,
    ...defaultSelectorStates,
}

export const inputStatesSlice = createSlice({
    name: 'inputStatesStore',
    initialState: ordersInitialState,
    reducers: {
        updateInputStates: (
            state,
            action: PayloadAction<InputStates | Record<string, any>>
        ) => {
            const newInputStates = action.payload
            Object.entries(newInputStates).forEach(([key, value]) => {
                state[key] = value
            })
        },
    },
})
