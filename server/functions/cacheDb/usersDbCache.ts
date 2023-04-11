import { cacheDb, getDataFromCache } from './functions'

export const cacheUsersDb = async (): Promise<void> => {
    try {
        await cacheDb('users')
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}

export const getUsersFromCache = async (): Promise<any[]> => {
    try {
        const users = await getDataFromCache('users')
        return users
    } catch (error) {
        throw new Error(`getUsersFromCache error`)
    }
}
