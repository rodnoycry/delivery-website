"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleItemsRequest = void 0;
const firestore_1 = require("firebase-admin/firestore");
// import { FieldValue } from 'firebase-admin/firestore'
const firebase_1 = require("../../firebase");
// Return all items
const handleItemsRequest = (req, res) => {
    const ids = req.body.ids;
    const type = req.body.type;
    const search = req.body.search;
    getItems(type, search, ids)
        .then((itemsRaw) => {
        const items = itemsRaw.map((doc) => doc.data());
        if (!search && !ids) {
            res.status(200).json(items);
        }
        if (ids) {
            res.status(200).json(items);
        }
        if (search) {
            const result = items.filter((item) => {
                return item.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
            res.status(200).json(result);
        }
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
exports.handleItemsRequest = handleItemsRequest;
const getItems = async (type, search, ids) => {
    const ref = firebase_1.db.collection('items');
    let docData;
    if (type) {
        docData = await ref
            .where('type', '==', type)
            .where('isActive', '==', true)
            .get();
    }
    else if (ids) {
        docData = await ref
            .where(firestore_1.FieldPath.documentId(), 'in', ids)
            .where('isActive', '==', true)
            .get();
    }
    else if (search) {
        docData = await ref.where('isActive', '==', true).get();
    }
    else {
        docData = await ref.get();
    }
    const items = docData.docs;
    return items;
};
//# sourceMappingURL=getItems.js.map