"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddPromo = void 0;
const firebase_1 = require("../../firebase");
// Add promo to db
const handleAddPromo = (req, res) => {
    var _a;
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!filename) {
        res.status(400).send();
        return;
    }
    const imageUrl = `/images/promos/${filename}`;
    const promoData = JSON.parse(req.body.promoData);
    promoData.image = imageUrl;
    if (!promoData.name || !promoData.description) {
        res.status(400).send();
        return;
    }
    addPromo(promoData)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleAddPromo = handleAddPromo;
const addPromo = async (promoData) => {
    const counterDocRef = firebase_1.db.collection('counters').doc('promos');
    try {
        const idNumber = await firebase_1.db.runTransaction(async (t) => {
            const promosCounterDoc = await t.get(counterDocRef);
            const counter = promosCounterDoc.data().counter;
            const id = counter + 1;
            t.update(counterDocRef, { counter: id });
            return id;
        });
        const idNumberString = idNumber.toString().padStart(6, '0');
        const id = idNumberString;
        promoData.id = id;
        const docRef = firebase_1.db.collection('promos').doc(id);
        await docRef.set(promoData);
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=addPromo.js.map