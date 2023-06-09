"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEditOrder = void 0;
const firebase_1 = require("../../firebase");
const cacheDb_1 = require("../../functions/cacheDb");
const handleEditOrder = (req, res) => {
    const { id, isActive } = req.body.orderData;
    updateOrder(id, isActive)
        .then(() => {
        (0, cacheDb_1.cacheOrdersDb)()
            .then(() => {
            res.status(204).send();
        })
            .catch((error) => {
            console.error(error);
            res.status(500).json(error).send();
        });
    })
        .catch((error) => {
        console.error(error);
        res.status(500).json(error).send();
    });
};
exports.handleEditOrder = handleEditOrder;
const updateOrder = async (id, isActive) => {
    try {
        const docRef = firebase_1.db.collection('orders').doc(id);
        await docRef.update({ isActive });
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=editOrder.js.map