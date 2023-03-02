"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetOrders = void 0;
const firebase_1 = require("../../firebase");
const handleGetOrders = (req, res) => {
    getOrders()
        .then((orders) => res.status(200).send(orders))
        .catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
};
exports.handleGetOrders = handleGetOrders;
const getOrders = async () => {
    try {
        const ref = firebase_1.db.collection('orders');
        const docData = await ref.get();
        const ordersDocs = docData.docs;
        const orders = ordersDocs.map((orderDoc) => orderDoc.data());
        return orders;
    }
    catch (error) {
        return error;
    }
};
//# sourceMappingURL=getOrders.js.map