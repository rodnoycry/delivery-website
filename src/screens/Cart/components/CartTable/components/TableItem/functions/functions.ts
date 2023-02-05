import { selectorsData } from '@/config'

export const getSecondaryLabel = (
    type: string,
    selected: number | boolean,
    qty?: number
): string => {
    if (type === 'pizza' || type === 'wok') {
        if (typeof selected === 'boolean') {
            throw new Error(
                `Type is '${type}', but selected is not a number, it's '${selected.toString()}'`
            )
        }
        return selectorsData[type][selected].title
    } else {
        return qty !== undefined ? `${qty.toString()} шт.` : ``
    }
}

export const getPrice = (
    type: string,
    price: number | number[],
    selected: number | boolean
): number => {
    if (type === 'pizza' || type === 'wok') {
        if (typeof selected === 'boolean') {
            throw new Error(
                `Type is '${type}', but selected is not a number, it's '${selected.toString()}'`
            )
        }
        if (!Array.isArray(price)) {
            throw new Error(
                `Type is '${type}', but price array is not given, current price: ${price.toString()}`
            )
        }
        return price[selected]
    } else {
        return price as number
    }
}
