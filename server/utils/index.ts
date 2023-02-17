import { Request, Response, NextFunction } from 'express'
import admin, { ServiceAccount } from 'firebase-admin'
import * as serviceAccount from '../config/serviceAccountKey.json'
import { adminEmails } from 'server/config'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: 'https://san-sei.firebaseio.com',
})

export interface AuthenticatedRequest extends Request {
    user: admin.auth.DecodedIdToken
}

export const checkAdmin = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Response | undefined => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]
    if (!idToken) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            if (!decodedToken.email) {
                throw new Error()
            }
            if (!adminEmails.includes(decodedToken.email)) {
                return res.status(403).send({ message: 'Forbidden' })
            }
            req.user = decodedToken
            next()
        })
        .catch(() => {
            return res.status(401).send({ message: 'Unauthorized' })
        })
}
