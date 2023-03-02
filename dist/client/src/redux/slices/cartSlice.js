"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const cartInitialState = [];
exports.cartSlice = (0, toolkit_1.createSlice)({
    name: 'cartState',
    initialState: cartInitialState,
    reducers: {
        resetCart: (state) => {
            state.splice(0, state.length);
        },
        setCart: (state, action) => {
            state.push(...action.payload);
        },
        addCartItem: (state, action) => {
            // Inserts new item near the same item if such item already exists,
            // otherwise push new
            const newItem = action.payload;
            let lastIndex = -1;
            for (let i = state.length - 1; i >= 0; i--) {
                if (state[i].id === newItem.id &&
                    state[i].selected === newItem.selected) {
                    lastIndex = i;
                    break;
                }
            }
            state.splice(lastIndex + 1, 0, newItem);
        },
        removeCartItem: (state, action) => {
            // Remove last specified item that exists in cart
            const { id, selected } = action.payload;
            const fittingItmesList = state.find((stateItem) => stateItem.id === id && stateItem.selected === selected);
            if (fittingItmesList === undefined) {
                return;
            }
            const itemIndex = state.lastIndexOf(fittingItmesList);
            state.splice(itemIndex, 1);
        },
        deleteCartItem: (state, action) => {
            // Deletes all such objects in cart
            const item = action.payload;
            for (let i = state.length - 1; i >= 0; i--) {
                if (state[i].id === item.id &&
                    state[i].selected === item.selected) {
                    state.splice(i, 1);
                }
            }
        },
    },
});
//# sourceMappingURL=cartSlice.js.map