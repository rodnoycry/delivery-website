import fs from 'fs'
import { getDataFromCache } from './functions'

// Temporary data in _userCarts.json for preserving authed user carts
export const getUserCartsFromCache = async (): Promise<Record<string, any>> => {
    try {
        const userCarts = await getDataFromCache('_userCarts')
        return userCarts
    } catch (error) {
        console.error(error)
        throw new Error(`getUserCartsFromCache error`)
    }
}

export const updateUserCarts = async (
    id: string,
    cartData: any[]
): Promise<void> => {
    try {
        const userCarts: Record<string, any> = await getUserCartsFromCache()
        userCarts[id] = cartData
        const jsonUserCarts = JSON.stringify(userCarts)
        fs.writeFileSync(
            `./server/db-cache/${'_userCarts'}.json`,
            jsonUserCarts
        )
        // console.log(`Collection "${'_userCarts'}" written to file`)
    } catch (error) {
        console.error(error)
        throw new Error(`updateUserCarts error`)
    }
}
