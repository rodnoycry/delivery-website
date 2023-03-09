"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEditItem = void 0;
const firebase_1 = require("../../firebase");
const functions_1 = require("./functions");
const cacheDb_1 = require("../../functions/cacheDb");
// Add item to db
const handleEditItem = (req, res) => {
    var _a;
    const itemData = JSON.parse(req.body.itemData);
    if (!itemData.id) {
        res.status(400).send();
        return;
    }
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    let imageUrl;
    if (filename) {
        imageUrl = `/images/items/${filename}`;
        itemData.image = imageUrl;
    }
    itemData.price = (0, functions_1.getIntegerPrice)(itemData.price);
    if (!(0, functions_1.validateItemData)(itemData)) {
        res.status(400).send();
        return;
    }
    editItem(itemData)
        .then(() => {
        (0, cacheDb_1.cacheItemsDb)() // Update cached items from db
            .then(() => {
            res.status(201).send();
        })
            .catch((error) => {
            console.log(error);
            return res.status(500).json({ error }).send();
        });
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleEditItem = handleEditItem;
const editItem = async (itemData) => {
    try {
        const docRef = firebase_1.db.collection('items').doc(itemData.id);
        await docRef.set(itemData);
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=editItem.js.map