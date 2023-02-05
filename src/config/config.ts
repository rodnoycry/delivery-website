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
