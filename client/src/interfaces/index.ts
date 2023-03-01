import { CartItem } from '@/redux/slices/cartSlice'
import { Zone } from '@/redux/slices/orderSlice'

// Promo related
export interface PromoData {
    id: string
    name: string
    description: string
    image: string
    isNew: boolean
}

// Items related
export interface ItemData {
    id: string
    type: string
    image: string
    name: string
    description?: string
    isNew: boolean
    spiciness?: number
    qty?: number
    price: number[] | number
}

export interface ServerItemData extends ItemData {
    isActive: boolean
}

export interface CartItemData extends ItemData {
    selected: number | boolean
    qtyInCart: number
}

export interface CarouselData {
    id: string
    image: string
}

export interface DetailedInputData {
    zone: string
    value?: string
    selected?: {
        label: string
        value: string
    }
    hasError?: boolean
    isRed?: boolean
}

// Orders related
export interface ServerOrder {
    id: string
    // Main data
    time: string
    date: string
    zone: string | Zone['zone']
    cart: CartItem[]
    sum: number
    // Inputs and selects data
    phone: string
    name: string
    deliveryType: string
    locality: string
    street: string
    house: string
    apartment: string
    entrance: string
    intercom: string
    // Part 2
    personQty: string
    deliveryTimeType: string
    deliveryDay: string
    deliveryTime: string
    paymentMethod: string
    hasChange: string
    comment: string

    isActive: boolean
}
// interface Item {
//     id: number
//     type: string
//     image: string
//     name: string
//     description: string
//     isNew: boolean
//     spiciness: number
//     price: number | number[]
// }

// export { Item }
