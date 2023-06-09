"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectorsData = exports.zoneDeliveryInfo = exports.categoryNamesDecode = exports.categoriesPaths = exports.topItemsAppearancePaths = void 0;
exports.topItemsAppearancePaths = [
    '/promo',
    '/sets',
    '/pizza',
    '/cold-rolls',
    '/hot-rolls',
    '/wok',
    '/meals',
    '/burgers',
    '/extra',
];
exports.categoriesPaths = [...exports.topItemsAppearancePaths];
exports.categoryNamesDecode = {
    promo: 'Акции',
    sets: 'Сеты',
    pizza: 'Пицца',
    'cold-rolls': 'Холодные роллы',
    'hot-rolls': 'Горячие роллы',
    wok: 'WOK и Лапша',
    meals: 'Горячее',
    burgers: 'Бургеры',
    extra: 'Дополнительно',
};
exports.zoneDeliveryInfo = {
    Талдом: {
        minSum: 500,
        deliveryPrice: 100,
        freeDelivery: 500,
        approximateTime: '45',
    },
    'Северный/Юркино': {
        minSum: 700,
        deliveryPrice: 150,
        freeDelivery: 1000,
        approximateTime: '45-60',
    },
    'До 15 км': {
        minSum: 1000,
        deliveryPrice: 200,
        freeDelivery: 1500,
        approximateTime: '60-75',
    },
};
exports.selectorsData = {
    pizza: [
        {
            id: 0,
            title: '25 см',
        },
        {
            id: 1,
            title: '33 см',
        },
        {
            id: 2,
            title: '40 см',
        },
    ],
    wok: [
        {
            id: 0,
            title: 'Терияки',
        },
        {
            id: 1,
            title: 'Унаги',
        },
        {
            id: 2,
            title: 'К.-С.',
        },
    ],
};
//# sourceMappingURL=config.js.map