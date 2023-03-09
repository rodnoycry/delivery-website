"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteItem = void 0;
const cacheDb_1 = require("../../functions/cacheDb");
const firebase_1 = require("../../firebase");
// Add item to db
const handleDeleteItem = (req, res) => {
    deleteItem(req.body.itemId)
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
exports.handleDeleteItem = handleDeleteItem;
const deleteItem = async (id) => {
    try {
        const docRef = firebase_1.db.collection('items').doc(id);
        await docRef.update({ isActive: false });
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=deleteItem.js.map