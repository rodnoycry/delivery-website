"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const firebase_1 = require("../firebase");
const config_1 = require("../config");
const checkAdmin = (req, res, next) => {
    const idToken = req.body.idToken;
    if (!idToken) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    firebase_1.auth.verifyIdToken(idToken)
        .then((decodedToken) => {
        if (!decodedToken.email) {
            throw new Error();
        }
        if (!config_1.adminEmails.includes(decodedToken.email)) {
            return res
                .status(403)
                .send({ isAdmin: false, message: 'Forbidden' });
        }
        req.body.decodedToken = decodedToken;
        next();
    })
        .catch((error) => {
        console.log(error);
        res.status(500).send({ isAdmin: false, error });
    });
};
exports.checkAdmin = checkAdmin;
//# sourceMappingURL=checkAdmin.js.map