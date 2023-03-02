"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTestRequest = void 0;
const express_validator_1 = require("express-validator");
const handleTestRequest = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    res.status(201).json({ status: 'success', data: { name, email } });
};
exports.handleTestRequest = handleTestRequest;
//# sourceMappingURL=testAPI.js.map