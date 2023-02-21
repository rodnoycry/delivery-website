import { ItemData } from '@/interfaces'
import Image0 from '@mockData/items/sets/images/set-0.jpg'
import Image1 from '@mockData/items/sets/images/set-1.jpg'
import Image2 from '@mockData/items/sets/images/set-2.jpg'
import Image3 from '@mockData/items/sets/images/set-3.jpg'
import Image4 from '@mockData/items/sets/images/set-4.jpg'
import Image5 from '@mockData/items/sets/images/set-5.jpg'

export const itemsData: ItemData[] = [
    {
        id: 5,
        type: 'set',
        image: Image0,
        name: '1,5 кг. Ассорти',
        description:
            'Калифорния с лососем Цуки ролл Ясай маки Тори запечённая Парадайз с крабом Калифорния темпура Сяке темпура',
        isNew: true,
        spiciness: 0,
        qty: 56,
        price: 1700,
    },
    {
        id: 6,
        type: 'set',
        image: Image1,
        name: 'Сет Талдом',
        description:
            'Фила лайт Калифорния классическая Парадайз Темпура с креветкой Мини с лососем запечённая Мини с крабом запечённая 48шт.',
        isNew: true,
        spiciness: 0,
        qty: 48,
        price: 1200,
    },
    {
        id: 7,
        type: 'set',
        image: Image2,
        name: 'Грин сет',
        description:
            'Калифорния с лососем Монако Чука ролл Мини ролл с огурцом',
        isNew: true,
        spiciness: 0,
        qty: 32,
        price: 799,
    },
    {
        id: 8,
        type: 'set',
        image: Image3,
        name: '1,5кг. Холодного',
        description:
            'Ясай маки Чука ролл Ролл спайс с лососем Бонито Калифорния с лососем Монако Мини ролл с авокадой Мини ролл с огурцом',
        isNew: true,
        spiciness: 0,
        qty: 64,
        price: 799,
    },
    {
        id: 9,
        type: 'set',
        image: Image4,
        name: 'Сет Панда',
        description:
            'Парадайз 4шт. Парадайз с мидиями 4шт. Тори запечённая 4шт. Калифорния запечённая 4шт.',
        isNew: false,
        spiciness: 0,
        qty: 64,
        price: 445,
    },
    {
        id: 10,
        type: 'set',
        image: Image5,
        name: 'Шифу сет',
        description:
            'Цезарь запечёный Гункан с лососем запечёный Мини ролл с крабом и спайс соусом',
        isNew: false,
        spiciness: 0,
        qty: 18,
        price: 375,
    },
]
