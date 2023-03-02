"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteCarousel = void 0;
const firebase_1 = require("../../firebase");
// Add carousel to db
const handleDeleteCarousel = (req, res) => {
    deleteCarousel(req.body.carouselId)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleDeleteCarousel = handleDeleteCarousel;
const deleteCarousel = async (id) => {
    try {
        const docRef = firebase_1.db.collection('carousels').doc(id);
        await docRef.update({ isActive: false });
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=deleteCarousel.js.map