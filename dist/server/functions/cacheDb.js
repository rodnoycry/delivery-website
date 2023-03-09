"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersFromCache = exports.cacheOrdersDb = exports.getItemsFromCache = exports.cacheItemsDb = void 0;
const fs_1 = __importDefault(require("fs"));
const firebase_1 = require("../firebase");
// Items order
const cacheItemsDb = async () => {
    const ref = firebase_1.db.collection('items');
    try {
        const docData = await ref.get();
        const itemsRaw = docData.docs;
        const items = itemsRaw.map((doc) => doc.data());
        const jsonItems = JSON.stringify(items);
        fs_1.default.writeFileSync(`./server/db-cache/${'items'}.json`, jsonItems);
        console.log('Data written to file');
    }
    catch (error) {
        console.error(error);
    }
};
exports.cacheItemsDb = cacheItemsDb;
const getItemsFromCache = async () => {
    try {
        const itemsRaw = fs_1.default.readFileSync(`./server/db-cache/${'items'}.json`, 'utf-8');
        const items = JSON.parse(itemsRaw);
        return items;
    }
    catch (error) {
        console.error(error);
        throw new Error(`getItemsFromCache error`);
    }
};
exports.getItemsFromCache = getItemsFromCache;
// Orders caching
const cacheOrdersDb = () => {
    const ref = firebase_1.db.collection('orders');
    ref.get()
        .then((docData) => {
        const ordersRaw = docData.docs;
        const orders = ordersRaw.map((doc) => doc.data());
        const jsonOrders = JSON.stringify(orders);
        fs_1.default.writeFileSync(`./server/db-cache/${'items'}.json`, jsonOrders);
        console.log('Data written to file');
    })
        .catch(console.error);
};
exports.cacheOrdersDb = cacheOrdersDb;
const getOrdersFromCache = async () => {
    try {
        const ordersRaw = fs_1.default.readFileSync(`./server/db-cache/${'orders'}.json`, 'utf-8');
        const orders = JSON.parse(ordersRaw);
        return orders;
    }
    catch (error) {
        console.error(error);
        throw new Error(`getOrdersFromCache error`);
    }
};
exports.getOrdersFromCache = getOrdersFromCache;
//# sourceMappingURL=cacheDb.js.map