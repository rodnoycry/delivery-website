"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetPromos = void 0;
const firebase_1 = require("../../firebase");
// Return all promos
const handleGetPromos = (req, res) => {
    getPromos()
        .then((promosRaw) => {
        const promos = promosRaw.map((doc) => doc.data());
        res.status(200).json(promos);
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
exports.handleGetPromos = handleGetPromos;
const getPromos = async () => {
    const ref = firebase_1.db.collection('promos');
    const docData = await ref.where('isActive', '==', true).get();
    const promos = docData.docs;
    return promos;
};
//# sourceMappingURL=getPromos.js.map