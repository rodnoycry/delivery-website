"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEditPromo = void 0;
const firebase_1 = require("../../firebase");
// Add promo to db
const handleEditPromo = (req, res) => {
    var _a;
    const promoData = JSON.parse(req.body.promoData);
    if (!promoData.id || !promoData.name || !promoData.description) {
        res.status(400).send();
        return;
    }
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    let imageUrl;
    if (filename) {
        imageUrl = `/images/promos/${filename}`;
        promoData.image = imageUrl;
    }
    editPromo(promoData)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleEditPromo = handleEditPromo;
const editPromo = async (promoData) => {
    try {
        const docRef = firebase_1.db.collection('promos').doc(promoData.id);
        await docRef.set(promoData);
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=editPromo.js.map