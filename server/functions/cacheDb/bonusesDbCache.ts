import { Bonus } from '../../interfaces'
import { cacheDb, getDataFromCache } from './functions'

export const cacheBonusesDb = async (): Promise<void> => {
    try {
        await cacheDb('bonuses')
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}

export const getBonusesFromCache = async (): Promise<Bonus[]> => {
    try {
        const items = (await getDataFromCache('bonuses')) as Bonus[]
        return items
    } catch (error) {
        throw new Error(`getBonusesFromCache error`)
    }
}
