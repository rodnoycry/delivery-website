"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const promos_1 = require("./api/promos");
const items_1 = require("./api/items");
const carousels_1 = require("./api/carousels");
const orders_1 = require("./api/orders");
const functions_1 = require("./functions");
const utils_1 = require("./utils");
const cacheDb_1 = require("./functions/cacheDb");
(0, cacheDb_1.cacheItemsDb)().catch(console.error); // Initial items caching
const app = (0, express_1.default)();
const port = 3000;
// Serve static files from the 'dist' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
app.use(express_1.default.json());
// FOR TESTS ONLY
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080',
}));
//
// Static handling
app.use('/images/items', express_1.default.static('public/images/items'));
app.use('/images/promos', express_1.default.static('public/images/promos'));
app.use('/images/carousels', express_1.default.static('public/images/carousels'));
app.use('/audio', express_1.default.static('public/audio'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
});
app.post('/api/admin/check', utils_1.checkAdmin, (req, res) => {
    return res.send({ isAdmin: true });
});
// Items handling
app.post('/api/items/get', items_1.handleItemsRequest);
const itemsUpload = (0, functions_1.getUploader)('./public/images/items');
app.post('/api/items/add', itemsUpload.single('image'), utils_1.checkAdmin, items_1.handleAddItem);
app.post('/api/items/edit', itemsUpload.single('image'), utils_1.checkAdmin, items_1.handleEditItem);
app.post('/api/items/delete', utils_1.checkAdmin, items_1.handleDeleteItem);
// Promos handling
app.post('/api/promos/get', promos_1.handleGetPromos);
const promosUpload = (0, functions_1.getUploader)('./public/images/promos');
app.post('/api/promos/add', promosUpload.single('image'), utils_1.checkAdmin, promos_1.handleAddPromo);
app.post('/api/promos/edit', promosUpload.single('image'), utils_1.checkAdmin, promos_1.handleEditPromo);
app.post('/api/promos/delete', utils_1.checkAdmin, promos_1.handleDeletePromo);
// Carousels handling
app.post('/api/carousels/get', carousels_1.handleGetCarousels);
const carouselsUpload = (0, functions_1.getUploader)('./public/images/carousels');
app.post('/api/carousels/add', carouselsUpload.single('image'), utils_1.checkAdmin, carousels_1.handleAddCarousel);
app.post('/api/carousels/edit', carouselsUpload.single('image'), utils_1.checkAdmin, carousels_1.handleEditCarousel);
app.post('/api/carousels/delete', utils_1.checkAdmin, carousels_1.handleDeleteCarousel);
// Orders handling
app.post('/api/orders/add', orders_1.handleNewOrder);
app.post('/api/orders/get', utils_1.checkAdmin, orders_1.handleGetOrders);
app.post('/api/orders/edit', utils_1.checkAdmin, orders_1.handleEditOrder);
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map