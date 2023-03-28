import type { Request, Response } from 'express'
import { auth } from '../../firebase'
import { updateUserCarts } from 'server/functions/cacheDb'

export const handleUpdateUserCart = (req: Request, res: Response): void => {
    const { idToken, cart } = req.body
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            const id = decodedToken.uid
            updateUserCart(id, cart)
                .then(() => {
                    res.status(204).send()
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).json(error).send()
                })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error).send()
        })
}

const updateUserCart = async (id: string, cart: any): Promise<void> => {
    try {
        await updateUserCarts(id, cart)
        return
    } catch (error) {
        console.error(error)
        throw new Error(`updateUserCart error`)
    }
}
