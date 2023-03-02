"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartItemsData = void 0;
const getCartItemsData = (itemsData, cart) => {
    const cartItemsData = [];
    cart.forEach((cartItem) => {
        const itemData = itemsData.find((itemData) => itemData.id === cartItem.id);
        if (itemData === undefined) {
            throw new Error(`Item is in the cart but there is no item whith such id in database: ${cartItem.id}`);
        }
        const cartItemIndex = cartItemsData.findIndex((cartItemData) => cartItemData.id === itemData.id &&
            cartItemData.selected === cartItem.selected);
        if (cartItemIndex === -1) {
            cartItemsData.push(Object.assign(Object.assign({}, itemData), { selected: cartItem.selected, qtyInCart: 1 }));
        }
        else {
            cartItemsData[cartItemIndex].qtyInCart += 1;
        }
    });
    return cartItemsData;
};
exports.getCartItemsData = getCartItemsData;
//# sourceMappingURL=getCartItemsData.js.map