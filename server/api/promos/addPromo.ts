import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { PromoData } from '@/interfaces'

// Add promo to db
export const handleAddPromo = (req: Request, res: Response): void => {
    const filename = req.file?.filename
    if (!filename) {
        res.status(400).send()
        return
    }
    const imageUrl = `/images/promos/${filename}`
    const promoData: PromoData = JSON.parse(req.body.promoData)
    promoData.image = imageUrl
    if (!promoData.name || !promoData.description) {
        res.status(400).send()
        return
    }
    addPromo(promoData)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const addPromo = async (promoData: PromoData): Promise<void> => {
    const counterDocRef = db.collection('counters').doc('promos')
    try {
        const idNumber = await db.runTransaction(async (t) => {
            const promosCounterDoc: any = await t.get(counterDocRef)
            const counter = promosCounterDoc.data().counter
            const id = (counter as number) + 1
            t.update(counterDocRef, { counter: id })
            return id
        })
        const idNumberString = idNumber.toString().padStart(6, '0')
        const id = idNumberString
        promoData.id = id
        const docRef = db.collection('promos').doc(id)
        await docRef.set(promoData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
