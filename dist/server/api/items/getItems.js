"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleItemsRequest = void 0;
const cacheDb_1 = require("../../functions/cacheDb");
// Return all items
const handleItemsRequest = (req, res) => {
    const ids = req.body.ids;
    const type = req.body.type;
    const search = req.body.search;
    getItems(type, search, ids)
        .then((items) => {
        res.status(200).json(items);
    })
        .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
    });
};
exports.handleItemsRequest = handleItemsRequest;
const getItems = async (type, search, ids) => {
    const items = await (0, cacheDb_1.getItemsFromCache)();
    if (type) {
        return items.filter((item) => item.isActive && item.type === type);
    }
    if (ids) {
        return items.filter((item) => item.isActive && ids.includes(item.id));
    }
    if (search) {
        return items.filter((item) => item.isActive && item.name.includes(search));
    }
    return items;
};
//# sourceMappingURL=getItems.js.map