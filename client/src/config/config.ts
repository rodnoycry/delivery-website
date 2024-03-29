import { CategoryName } from '@/interfaces'

export const categoriesNames: CategoryName[] = [
    'promo',
    'sets',
    'pizza',
    'cold-rolls',
    'hot-rolls',
    'wok',
    'meals',
    'burgers',
    'extra',
]

export const topItemsAppearancePaths = categoriesNames.map(
    (categoryName) => `/${categoryName as string}`
)

export const categoriesPaths = [...topItemsAppearancePaths]

export const categoryNamesDecode: Record<CategoryName, string> = {
    promo: 'Акции',
    sets: 'Сеты',
    pizza: 'Пицца',
    'cold-rolls': 'Холодные роллы',
    'hot-rolls': 'Горячие роллы',
    wok: 'WOK и Лапша',
    meals: 'Горячее',
    burgers: 'Бургеры',
    extra: 'Дополнительно',
}

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
