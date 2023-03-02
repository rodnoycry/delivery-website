"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const getItems = async (type = null, search = null, ids = null) => {
    const data = {
        type,
        search,
        ids,
    };
    try {
        // console.log('started request')
        const response = await axios_1.default.post(`${config_1.domain}/api/items/get`, data);
        return response.data;
    }
    catch (error) {
        console.log(error.message);
        return [];
    }
};
exports.getItems = getItems;
//# sourceMappingURL=items.js.map