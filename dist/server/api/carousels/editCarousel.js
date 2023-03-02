"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEditCarousel = void 0;
const firebase_1 = require("../../firebase");
// Add carousel to db
const handleEditCarousel = (req, res) => {
    var _a;
    const carouselData = JSON.parse(req.body.carouselData);
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    let imageUrl;
    if (filename) {
        imageUrl = `/images/carousels/${filename}`;
        carouselData.image = imageUrl;
    }
    editCarousel(carouselData)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleEditCarousel = handleEditCarousel;
const editCarousel = async (carouselData) => {
    try {
        const docRef = firebase_1.db.collection('carousels').doc(carouselData.id);
        await docRef.set(carouselData);
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=editCarousel.js.map