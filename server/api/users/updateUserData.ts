import type { Request, Response } from 'express'
import { db, auth } from '../../firebase'
import { cacheUsersDb } from '../../functions/cacheDb'

export const handleUpdateUserData = (req: Request, res: Response): void => {
    const { idToken, userData } = req.body
    const updateUserData = async (
        idToken: string,
        userData: any
    ): Promise<void> => {
        try {
            const decodedToken = await auth.verifyIdToken(idToken)
            const id = decodedToken.id
            const docRef = db.collection(`users`).doc(id)
            await docRef.update(userData)
            await cacheUsersDb()
            res.status(204).send()
        } catch (error) {
            console.error(error)
            res.status(500).json(error).send()
            throw new Error(`handleUpdateUserData error`)
        }
    }
    updateUserData(idToken, userData).catch(console.error)
}
