import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { getOrdersFromCache } from '../../functions/cacheDb'

export const handleGetOrders = (req: Request, res: Response): void => {
    getOrdersFromCache()
        .then((orders) => res.status(200).send(orders))
        .catch((error) => {
            console.error(error)
            res.status(500).send(error)
        })
}

// const getOrders = async (): Promise<any> => {
//     try {
//         // console.log(`orders geted`)
//         const ref = db.collection('orders')
//         const docData = await ref.get()
//         const ordersDocs = docData.docs
//         const orders = ordersDocs.map((orderDoc) => orderDoc.data())
//         return orders
//     } catch (error) {
//         return error
//     }
// }
