"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetOrders = void 0;
const cacheDb_1 = require("../../functions/cacheDb");
const handleGetOrders = (req, res) => {
    (0, cacheDb_1.getOrdersFromCache)()
        .then((orders) => res.status(200).send(orders))
        .catch((error) => {
        console.error(error);
        res.status(500).send(error);
    });
};
exports.handleGetOrders = handleGetOrders;
// const getOrders = async (): Promise<any> => {
//     try {
//         // console.log(`orders geted`)
//         const ref = db.collection('orders')
//         const docData = await ref.get()
//         const ordersDocs = docData.docs
//         const orders = ordersDocs.map((orderDoc) => orderDoc.data())
//         return orders
//     } catch (error) {
//         return error
//     }
// }
//# sourceMappingURL=getOrders.js.map