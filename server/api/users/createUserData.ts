import type { Request, Response } from 'express'
import { auth } from '../../firebase'
import { createUser } from './functions'

export const handleCreateUserData = (req: Request, res: Response): void => {
    const idToken = req.body.idToken
    const sessionId = req.cookies.sessionId
    const userDataFromRequest = req.body.userData
    const allowDuplicate = req.body.allowDuplicate
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            createUser(decodedToken, sessionId, userDataFromRequest)
                .then(() => {
                    res.status(201).send()
                })
                .catch((error) => {
                    if (error.message === 'already-exists' && allowDuplicate) {
                        res.status(200).send()
                    } else {
                        res.status(500).send({ error })
                    }
                })
        })
        .catch((error) => {
            res.status(500).send({ error })
        })
}
