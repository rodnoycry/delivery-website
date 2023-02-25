import { ItemData } from '@/interfaces'
import Image0 from '@mockData/items/pizza/images/pizza-0.jpg'
import Image1 from '@mockData/items/pizza/images/pizza-1.jpg'
import Image2 from '@mockData/items/pizza/images/pizza-2.jpg'
import Image3 from '@mockData/items/pizza/images/pizza-3.jpg'
import Image4 from '@mockData/items/pizza/images/pizza-4.jpg'

export const itemsData: ItemData[] = [
    {
        id: '0',
        type: 'pizza',
        image: Image0,
        name: 'Острая с курицей',
        description:
            'Курица, перец халапень, салат айсберг, помидор, перец болгарский спайс соус.',
        isNew: false,
        spiciness: 0,
        price: [350, 500, 650],
    },
    {
        id: '1',
        type: 'pizza',
        image: Image1,
        name: 'Карбонара',
        description: 'Соус томатный, лук красный, бекон, яйцо куриное',
        isNew: true,
        spiciness: 0,
        price: [350, 500, 650],
    },
    {
        id: '2',
        type: 'pizza',
        image: Image2,
        name: 'Деревенская',
        description:
            'Сыр моцарелла, пепперони, охотничьи колбаски, боварские сосиски, свинина, бекон, красный лук, спайс соус',
        isNew: false,
        spiciness: 0,
        price: [400, 550, 700],
    },
    {
        id: '3',
        type: 'pizza',
        image: Image3,
        name: 'Салями',
        description: 'Соус томатный для пиццы, сыр моцарелла, колбаса салями',
        isNew: false,
        spiciness: 0,
        price: [330, 480, 630],
    },
    {
        id: '4',
        type: 'pizza',
        image: Image4,
        name: 'Цезарь',
        description:
            'Курица, салат айсберг, сыр Моцарелла, помидоры черри, сыр Пармезан, соус цезарь, соус томатный для пиццы',
        isNew: false,
        spiciness: 0,
        price: [350, 500, 650],
    },
]
