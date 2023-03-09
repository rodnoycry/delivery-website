"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsFromCache = exports.cacheItemsDb = void 0;
const fs_1 = __importDefault(require("fs"));
const firebase_1 = require("../firebase");
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
//# sourceMappingURL=cacheDb.js.map