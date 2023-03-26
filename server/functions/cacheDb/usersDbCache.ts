import { cacheDb, getDataFromCache } from './functions'

export const cacheUsersDb = async (): Promise<void> => {
    cacheDb('users').catch(console.error)
}

export const getUsersFromCache = async (): Promise<any[]> => {
    try {
        const users = await getDataFromCache('users')
        return users
    } catch (error) {
        throw new Error(`getUsersFromCache error`)
    }
}
