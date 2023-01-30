import Image0 from './images/pizza/pizza-0.jpg'
import Image1 from './images/pizza/pizza-1.jpg'
import Image2 from './images/pizza/pizza-2.jpg'
import Image3 from './images/pizza/pizza-3.jpg'
import Image4 from './images/pizza/pizza-4.jpg'

export const itemsData = [
    {
        id: 0,
        type: 'pizza',
        image: Image0,
        name: 'Острая с курицей',
        description:
            'Курица,перец халапень, салат айсберг, помидор, перец болгарский спайс соус.',
        hot: 0,
        weight: false,
        price: [350, 500, 650],
    },
    {
        id: 1,
        type: 'pizza',
        image: Image1,
        name: 'Карбонара',
        description: 'Соус томатный, лук красный, бекон, яйцо куриное',
        hot: 0,
        weight: false,
        price: [350, 500, 650],
    },
    {
        id: 2,
        type: 'pizza',
        image: Image2,
        name: 'Деревенская',
        description:
            'Сыр моцарелла, пепперони, охотничьи колбаски, боварские сосиски, свинина, бекон, красный лук, спайс соус',
        hot: 0,
        weight: false,
        price: [400, 550, 700],
    },
    {
        id: 3,
        type: 'pizza',
        image: Image3,
        name: 'Салями',
        description: 'Соус томатный для пиццы, сыр моцарелла, колбаса салями',
        hot: 0,
        weight: false,
        price: [330, 480, 630],
    },
    {
        id: 4,
        type: 'pizza',
        image: Image4,
        name: 'Цезарь',
        description:
            'Курица, салат айсберг, сыр Моцарелла, помидоры черри, сыр Пармезан, соус цезарь, соус томатный для пиццы',
        hot: 0,
        weight: [390, 800, 1000],
        price: [350, 500, 650],
    },
]
