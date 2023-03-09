import fs from 'fs'
import { ServerItemData } from '@/interfaces'
import { db } from '../firebase'

// Items order
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

// Orders caching
export const cacheOrdersDb = (): void => {
    const ref = db.collection('orders')
    ref.get()
        .then((docData) => {
            const ordersRaw = docData.docs
            const orders = ordersRaw.map((doc) => doc.data())
            const jsonOrders = JSON.stringify(orders)
            fs.writeFileSync(`./server/db-cache/${'items'}.json`, jsonOrders)
            console.log('Data written to file')
        })
        .catch(console.error)
}

export const getOrdersFromCache = async (): Promise<ServerItemData[]> => {
    try {
        const ordersRaw = fs.readFileSync(
            `./server/db-cache/${'orders'}.json`,
            'utf-8'
        )
        const orders = JSON.parse(ordersRaw)
        return orders
    } catch (error) {
        console.error(error)
        throw new Error(`getOrdersFromCache error`)
    }
}
