"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddItem = void 0;
const firebase_1 = require("../../firebase");
const functions_1 = require("./functions");
// Add item to db
const handleAddItem = (req, res) => {
    var _a;
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!filename) {
        console.error(`handleAddItem: new item image is missing (400)`);
        res.status(400).send();
        return;
    }
    const imageUrl = `/images/items/${filename}`;
    const itemData = JSON.parse(req.body.itemData);
    itemData.price = (0, functions_1.getIntegerPrice)(itemData.price);
    itemData.image = imageUrl;
    if (!(0, functions_1.validateItemData)(itemData)) {
        res.status(400).send();
        return;
    }
    addItem(itemData)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleAddItem = handleAddItem;
const addItem = async (itemData) => {
    const counterDocRef = firebase_1.db.collection('counters').doc('items');
    try {
        const idNumber = await firebase_1.db.runTransaction(async (t) => {
            const itemsCounterDoc = await t.get(counterDocRef);
            const counter = itemsCounterDoc.data().counter;
            const id = counter + 1;
            t.update(counterDocRef, { counter: id });
            return id;
        });
        const idNumberString = idNumber.toString().padStart(6, '0');
        const id = `${itemData.type}-${idNumberString}`;
        itemData.id = id;
        const docRef = firebase_1.db.collection('items').doc(id);
        await docRef.set(itemData);
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=addItem.js.map