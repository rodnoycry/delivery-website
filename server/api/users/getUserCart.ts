import type { Request, Response } from 'express'
import { getUserCartsFromCache } from '../../functions/cacheDb'
import { auth } from '../../firebase'

export const handleGetUserCart = (req: Request, res: Response): void => {
    const idToken = req.body.idToken
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid
            getUserCartsFromCache()
                .then((userCarts) => {
                    const cart = userCarts[uid]
                    res.status(200).send(cart)
                })
                .catch((error) => {
                    console.error(error)
                    res.status(404).send(error)
                })
        })
        .catch((error) => {
            console.error(error)
            res.status(403).send(error)
        })
}
