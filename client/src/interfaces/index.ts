import { CartItem } from '@/redux/slices/cartSlice'

// Promo related
export interface PromoData {
    id: number
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

// Orders related
export interface DetailedOrder {
    // Main data
    time: string
    cart: CartItem[]
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
    deliveryTime: string
    toDay: string
    toTime: string
    paymentMethod: string
    comment: string
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
