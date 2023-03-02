"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAddCarousel = void 0;
const firebase_1 = require("../../firebase");
// Add Carousel to db
const handleAddCarousel = (req, res) => {
    var _a;
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!filename) {
        res.status(400).send();
        return;
    }
    const imageUrl = `/images/carousels/${filename}`;
    const carouselData = JSON.parse(req.body.carouselData);
    carouselData.image = imageUrl;
    addCarousel(carouselData)
        .then(() => {
        return res.status(201).send();
    })
        .catch((error) => {
        console.error(error);
        return res.status(500).json({ error }).send();
    });
};
exports.handleAddCarousel = handleAddCarousel;
const addCarousel = async (carouselData) => {
    const counterDocRef = firebase_1.db.collection('counters').doc('carousels');
    try {
        const idNumber = await firebase_1.db.runTransaction(async (t) => {
            const CarouselsCounterDoc = await t.get(counterDocRef);
            const counter = CarouselsCounterDoc.data().counter;
            const id = counter + 1;
            t.update(counterDocRef, { counter: id });
            return id;
        });
        const idNumberString = idNumber.toString().padStart(6, '0');
        const id = idNumberString;
        carouselData.id = id;
        const docRef = firebase_1.db.collection('carousels').doc(id);
        await docRef.set(carouselData);
        return;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
};
//# sourceMappingURL=addCarousel.js.map