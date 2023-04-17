import { cacheDb, getDataFromCache } from './functions'

export const cacheOrdersDb = async (): Promise<void> => {
    try {
        await cacheDb('orders')
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}

export const getOrdersFromCache = async (): Promise<any[]> => {
    try {
        const orders = await getDataFromCache('orders')
        return orders
    } catch (error) {
        console.log(error)
        throw new Error(`getOrdersFromCache error`)
    }
}
