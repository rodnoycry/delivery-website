"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntegerPrice = exports.validateItemData = void 0;
const validateItemData = ({ type, name, price, }) => {
    let isValid = true;
    if (!name) {
        isValid = false;
    }
    if (type === 'pizza') {
        if (Array.isArray(price)) {
            price.forEach((singlePrice) => {
                isValid = typeof singlePrice === 'number';
            });
        }
        else {
            isValid = false;
        }
    }
    else {
        isValid = typeof price === 'string';
    }
    return isValid;
};
exports.validateItemData = validateItemData;
const getIntegerPrice = (price) => {
    if (Array.isArray(price)) {
        return price.map((singlePrice) => {
            const parsedPrice = parseInt(singlePrice);
            return parsedPrice;
        });
    }
    else {
        return parseInt(price);
    }
};
exports.getIntegerPrice = getIntegerPrice;
//# sourceMappingURL=index.js.map