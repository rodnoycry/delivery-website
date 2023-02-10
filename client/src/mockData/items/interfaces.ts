export interface ItemData {
    id: number
    type: string
    image: string
    name: string
    description: string
    isNew: boolean
    spiciness?: number
    qty?: number
    price: number[] | number
    selected?: number | false
}
