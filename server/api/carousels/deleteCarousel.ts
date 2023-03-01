import type { Request, Response } from 'express'
import { db } from '../../firebase'

// Add carousel to db
export const handleDeleteCarousel = (req: Request, res: Response): void => {
    deleteCarousel(req.body.carouselId)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const deleteCarousel = async (id: string): Promise<void> => {
    try {
        const docRef = db.collection('carousels').doc(id)
        await docRef.update({ isActive: false })
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
