import type { Request, Response } from 'express'
import { auth } from '../../firebase'
import { getUsersFromCache } from '../../functions/cacheDb'
import { createUser } from './functions'

export const handleGetUserData = (req: Request, res: Response): void => {
    const idToken = req.body.idToken
    const sessionId = req.cookies.sessionId
    const displayNameFromRequest = req.body?.displayName
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid
            getUsersFromCache()
                .then((users) => {
                    let userData
                    users.forEach((user) => {
                        if (user?.id === uid) {
                            userData = {
                                displayName: user?.displayName,
                                email: user?.email,
                                phone: user?.phone,
                                inputStates: user?.inputStates,
                            }
                        }
                    })
                    if (userData) {
                        res.status(200).send(userData)
                    } else {
                        createUser(
                            decodedToken,
                            sessionId,
                            displayNameFromRequest
                        )
                            .then(() => {
                                res.status(201).send({
                                    displayName: displayNameFromRequest,
                                    email: decodedToken.email,
                                })
                            })
                            .catch((error) => {
                                res.status(404).send({ error })
                            })
                    }
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).send({ error })
                })
        })
        .catch((error) => {
            console.log(error)
            res.status(500).send({ error })
        })
}
