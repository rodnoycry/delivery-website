import { ServerItemData } from '../../interfaces'
import { cacheDb, getDataFromCache } from './functions'

export const cacheItemsDb = async (): Promise<void> => {
    cacheDb('items').catch(console.error)
}

export const getItemsFromCache = async (): Promise<ServerItemData[]> => {
    try {
        const items = (await getDataFromCache('items')) as ServerItemData[]
        return items
    } catch (error) {
        throw new Error(`getItemsFromCache error`)
    }
}
