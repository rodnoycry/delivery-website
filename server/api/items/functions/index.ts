import { ServerItemData } from '@/interfaces'

export const validateItemData = ({
    type,
    name,
    price,
}: ServerItemData): boolean => {
    let isValid = true
    if (!name) {
        console.error(`validateItemData: New item name is missing (400)`)
        isValid = false
        return isValid
    }
    if (type === 'pizza') {
        if (Array.isArray(price)) {
            price.forEach((singlePrice) => {
                isValid = typeof singlePrice === 'number'
            })
        } else {
            console.error(
                `validateItemData: Invalid price for pizza item (number instead of Array<number>) (400)
                price: ${price}`
            )
            isValid = false
            return isValid
        }
    } else {
        isValid = typeof price === 'number' || type === 'wok'
        if (!isValid) {
            console.error(
                `validateItemData: Invalid price for Non-pizza item (${typeof price} instead of number) (400)`
            )
        }
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
