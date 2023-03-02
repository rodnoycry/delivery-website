"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeletePromo = void 0;
const firebase_1 = require("../../firebase");
// Add promo to db
const handleDeletePromo = (req, res) => {
    deletePromo(req.body.promoId)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleDeletePromo = handleDeletePromo;
const deletePromo = async (id) => {
    try {
        const docRef = firebase_1.db.collection('promos').doc(id);
        await docRef.update({ isActive: false });
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=deletePromo.js.map