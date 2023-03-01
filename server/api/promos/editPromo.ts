import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { PromoData } from '@/interfaces'

// Add promo to db
export const handleEditPromo = (req: Request, res: Response): void => {
    const promoData = JSON.parse(req.body.promoData)
    if (!promoData.id || !promoData.name || !promoData.description) {
        res.status(400).send()
        return
    }
    const filename = req.file?.filename
    let imageUrl
    if (filename) {
        imageUrl = `/images/promos/${filename}`
        promoData.image = imageUrl
    }
    editPromo(promoData)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const editPromo = async (promoData: PromoData): Promise<void> => {
    try {
        const docRef = db.collection('promos').doc(promoData.id)
        await docRef.set(promoData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
