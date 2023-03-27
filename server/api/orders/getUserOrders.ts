import type { Request, Response } from 'express'
import { getOrdersFromCache } from '../../functions/cacheDb'
import { auth } from '../../firebase'

export const handleGetUserOrders = (req: Request, res: Response): void => {
    const idToken = req.body?.idToken
    if (!idToken) {
        res.status(403).send({ message: `No auth token` })
    }
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid
            getOrdersFromCache()
                .then((orders) => {
                    const result = orders.filter((order) => {
                        return order?.uid === uid
                    })
                    res.status(200).send(result)
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).send(error)
                })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send(error)
        })
}
