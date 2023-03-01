import type { Request, Response } from 'express'
import { db } from '../../firebase'

// Add promo to db
export const handleDeletePromo = (req: Request, res: Response): void => {
    deletePromo(req.body.promoId)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const deletePromo = async (id: string): Promise<void> => {
    try {
        const docRef = db.collection('promos').doc(id)
        await docRef.update({ isActive: false })
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
