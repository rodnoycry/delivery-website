import { Request, Response, NextFunction } from 'express'
import { auth } from '../firebase'
import { adminEmails } from '../config'

export const checkAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | undefined => {
    const idToken = req.body.idToken
    if (!idToken) {
        return res.status(401).send({ message: 'Unauthorized' })
    }
    next()
    return
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            if (!decodedToken.email) {
                throw new Error()
            }
            if (!adminEmails.includes(decodedToken.email)) {
                return res
                    .status(403)
                    .send({ isAdmin: false, message: 'Forbidden' })
            }
            req.body.decodedToken = decodedToken
            next()
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send({ isAdmin: false, error })
        })
}
