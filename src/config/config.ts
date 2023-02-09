import { itemsData as setsData } from '@mockData/items/sets'
import { itemsData as pizzaData } from '@mockData/items/pizza'

export const itemsPathsRenderData = {
    '/sets': {
        title: 'Сеты',
        data: setsData,
    },
    '/pizza': {
        title: 'Пицца',
        data: pizzaData,
    },
}

export const topItemsAppearancePaths = [
    '/promo',
    '/sets',
    '/pizza',
    '/cold-rolls',
    '/hot-rolls',
    '/wok',
    '/meals',
    '/burgers',
    '/extra',
]

export const zoneDeliveryInfo = {
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
}

export const selectorsData = {
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
}
