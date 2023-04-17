import type { Request, Response } from 'express'
import { db, auth } from '../../firebase'
import { cacheUsersDb } from '../../functions/cacheDb'

export const handleUpdateUserInputs = (req: Request, res: Response): void => {
    const { idToken, inputStates } = req.body
    auth.verifyIdToken(idToken)
        .then((decodedToken) => {
            const id = decodedToken.uid
            updateUserInputs(id, inputStates)
                .then(() => {
                    cacheUsersDb()
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
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error).send()
        })
}

const updateUserInputs = async (
    id: string,
    inputStates: any
): Promise<void> => {
    try {
        const docRef = db.collection(`users`).doc(id)
        await docRef.update({ inputStates })
        return
    } catch (error) {
        console.error(error)
        throw new Error(`updateUserInputs error`)
    }
}
