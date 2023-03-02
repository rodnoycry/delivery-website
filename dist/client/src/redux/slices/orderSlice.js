"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createDefaultInputStates = (inputNames) => {
    const defaultInputStates = {};
    inputNames.forEach((inputName) => (defaultInputStates[inputName] = {
        value: '',
        hasError: false,
        isRed: false,
        onFocus: false,
    }));
    return defaultInputStates;
};
const createDefaultSelectStates = (selectDataArr) => {
    const defaultInputStates = {};
    Object.entries(selectDataArr).forEach(([selectName, defaultValue]) => (defaultInputStates[selectName] = {
        selected: {
            label: defaultValue,
            value: defaultValue,
        },
    }));
    return defaultInputStates;
};
const defaultInputStates = createDefaultInputStates([
    'PhoneInput',
    'NameInput',
    'LocalityInput',
    'StreetInput',
    'HouseInput',
    'ApartmentInput',
    'EntranceInput',
    'IntercomInput',
]);
const defaultSelectorStates = createDefaultSelectStates({
    DeliveryTypeSelect: 'На указанный адрес',
    PersonQtySelect: '1 человек',
    TimeSelect: 'По готовности',
    DaySelect: '10 февраля',
    PaymentSelect: 'Банковской картой курьеру',
    ChangeSelect: 'Со сдачей',
});
const ordersInitialState = Object.assign(Object.assign({ zone: 'Талдом' }, defaultInputStates), defaultSelectorStates);
exports.orderSlice = (0, toolkit_1.createSlice)({
    name: 'orderState',
    initialState: ordersInitialState,
    reducers: {
        updateOrder: (state, action) => {
            const newOrderData = action.payload;
            Object.entries(newOrderData).forEach(([key, value]) => {
                state[key] = value;
            });
        },
    },
});
//# sourceMappingURL=orderSlice.js.map