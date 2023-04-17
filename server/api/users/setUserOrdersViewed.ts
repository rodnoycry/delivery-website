import type { Request, Response } from 'express'
import { db, auth } from '../../firebase'
import { cacheOrdersDb } from '../../functions/cacheDb'

export const handleSetUserOrdersViewed = (
    req: Request,
    res: Response
): void => {
    const { idToken } = req.body
    const setUserOrdersViewed = async (idToken: string): Promise<void> => {
        try {
            const decodedToken = await auth.verifyIdToken(idToken)
            const uid = decodedToken.uid
            const ordersRef = db.collection('orders')
            const querySnapshot = await ordersRef.where('uid', '==', uid).get()

            if (querySnapshot.empty) {
                throw new Error()
            }

            const batch = db.batch()
            querySnapshot.forEach((doc) => {
                const docRef = ordersRef.doc(doc.id)
                batch.update(docRef, { isNewStatus: false })
            })

            await batch.commit()
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    }
    setUserOrdersViewed(idToken)
        .then(() => {
            cacheOrdersDb()
                .then(() => {
                    res.status(200).send('Successfully updated documents')
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).send({ error })
                })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send({ error })
        })
}
