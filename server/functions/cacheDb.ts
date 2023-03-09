import fs from 'fs'
import { ServerItemData } from '@/interfaces'
import { db } from '../firebase'

export const cacheItemsDb = async (): Promise<void> => {
    const ref = db.collection('items')
    try {
        const docData = await ref.get()
        const itemsRaw = docData.docs
        const items = itemsRaw.map((doc) => doc.data())
        const jsonItems = JSON.stringify(items)
        fs.writeFileSync(`./server/db-cache/${'items'}.json`, jsonItems)
        console.log('Data written to file')
    } catch (error) {
        console.error(error)
    }
}

export const getItemsFromCache = async (): Promise<ServerItemData[]> => {
    try {
        const itemsRaw = fs.readFileSync(
            `./server/db-cache/${'items'}.json`,
            'utf-8'
        )
        const items = JSON.parse(itemsRaw)
        return items
    } catch (error) {
        console.error(error)
        throw new Error(`getItemsFromCache error`)
    }
}
