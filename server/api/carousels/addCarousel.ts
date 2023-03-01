import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { CarouselData } from '@/interfaces'

// Add Carousel to db
export const handleAddCarousel = (req: Request, res: Response): void => {
    const filename = req.file?.filename
    if (!filename) {
        res.status(400).send()
        return
    }
    const imageUrl = `/images/carousels/${filename}`
    const carouselData: CarouselData = JSON.parse(req.body.carouselData)
    carouselData.image = imageUrl
    addCarousel(carouselData)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const addCarousel = async (carouselData: CarouselData): Promise<void> => {
    const counterDocRef = db.collection('counters').doc('carousels')
    try {
        const idNumber = await db.runTransaction(async (t) => {
            const CarouselsCounterDoc: any = await t.get(counterDocRef)
            const counter = CarouselsCounterDoc.data().counter
            const id = (counter as number) + 1
            t.update(counterDocRef, { counter: id })
            return id
        })
        const idNumberString = idNumber.toString().padStart(6, '0')
        const id = idNumberString
        carouselData.id = id
        const docRef = db.collection('carousels').doc(id)
        await docRef.set(carouselData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
