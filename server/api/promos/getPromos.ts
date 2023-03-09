import type { Request, Response } from 'express'
import { db } from '../../firebase'

// Return all promos
export const handleGetPromos = (req: Request, res: Response): void => {
    getPromos()
        .then((promosRaw) => {
            const promos = promosRaw.map(
                (
                    doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
                ) => doc.data()
            )
            // console.log(`promos geted`)
            res.status(200).json(promos)
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

const getPromos = async (): Promise<any> => {
    const ref = db.collection('promos')
    const docData = await ref.where('isActive', '==', true).get()
    const promos = docData.docs
    return promos
}
