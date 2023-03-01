import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { CarouselData } from '@/interfaces'

// Add carousel to db
export const handleEditCarousel = (req: Request, res: Response): void => {
    const carouselData = JSON.parse(req.body.carouselData)
    const filename = req.file?.filename
    let imageUrl
    if (filename) {
        imageUrl = `/images/carousels/${filename}`
        carouselData.image = imageUrl
    }
    editCarousel(carouselData)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const editCarousel = async (carouselData: CarouselData): Promise<void> => {
    try {
        const docRef = db.collection('carousels').doc(carouselData.id)
        await docRef.set(carouselData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
