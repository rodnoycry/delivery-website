"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUploader = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const getUploader = (uploadPath) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
        },
    });
    const upload = (0, multer_1.default)({ storage });
    return upload;
};
exports.getUploader = getUploader;
//# sourceMappingURL=functions.js.map