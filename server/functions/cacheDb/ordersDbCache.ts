import { cacheDb, getDataFromCache } from './functions'

export const cacheOrdersDb = async (): Promise<void> => {
    cacheDb('orders').catch(console.error)
}

export const getOrdersFromCache = async (): Promise<any[]> => {
    try {
        const orders = await getDataFromCache('orders')
        return orders
    } catch (error) {
        throw new Error(`getOrdersFromCache error`)
    }
}
