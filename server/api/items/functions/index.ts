import { ServerItemData } from '@/interfaces'

export const validateItemData = ({
    type,
    name,
    price,
}: ServerItemData): boolean => {
    let isValid = true
    if (!name) {
        isValid = false
    }
    if (type === 'pizza') {
        if (Array.isArray(price)) {
            price.forEach((singlePrice) => {
                isValid = typeof singlePrice === 'number'
            })
        } else {
            isValid = false
        }
    } else {
        isValid = typeof price === 'string'
    }
    return isValid
}

export const getIntegerPrice = (
    price: string | string[]
): number | number[] => {
    if (Array.isArray(price)) {
        return price.map((singlePrice) => {
            const parsedPrice = parseInt(singlePrice)
            return parsedPrice
        })
    } else {
        return parseInt(price)
    }
}
