// Items related
export interface ItemData {
    id: string
    type: string
    image: string
    name: string
    description?: string
    isNew: boolean
    spiciness?: number
    qty?: number | string
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
