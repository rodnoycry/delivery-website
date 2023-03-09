"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetCarousels = void 0;
const firebase_1 = require("../../firebase");
// Return all carousels
const handleGetCarousels = (req, res) => {
    getCarousels()
        .then((carousels) => {
        // console.log(`carousels geted`)
        res.status(200).json(carousels).send();
    })
        .catch((error) => {
        res.status(500).json({ error }).send();
    });
};
exports.handleGetCarousels = handleGetCarousels;
const getCarousels = async () => {
    const ref = firebase_1.db.collection('carousels');
    const docData = await ref.where('isActive', '==', true).get();
    const carouselsRaw = docData.docs;
    const carousels = carouselsRaw.map((doc) => doc.data());
    return carousels;
};
//# sourceMappingURL=getCarousels.js.map