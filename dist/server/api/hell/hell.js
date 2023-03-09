"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStoreItemsData = void 0;
const fs_1 = __importDefault(require("fs"));
const firebase_1 = require("../../firebase");
const handleStoreItemsData = (req, res) => {
    const ref = firebase_1.db.collection('items');
    ref.get()
        .then((docData) => {
        const itemsRaw = docData.docs;
        const items = itemsRaw.map((doc) => doc.data());
        const jsonItems = JSON.stringify(items);
        fs_1.default.writeFile('items.json', jsonItems, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Data written to file');
            }
        });
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send();
    });
};
exports.handleStoreItemsData = handleStoreItemsData;
//# sourceMappingURL=hell.js.map