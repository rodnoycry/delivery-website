import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { ServerItemData } from '@/interfaces'
import { getIntegerPrice, validateItemData } from './functions'

// Add item to db
export const handleAddItem = (req: Request, res: Response): void => {
    const filename = req.file?.filename
    if (!filename) {
        res.status(400).send()
        return
    }
    const imageUrl = `/images/items/${filename}`
    const itemData = JSON.parse(req.body.itemData)
    itemData.price = getIntegerPrice(itemData.price)
    itemData.image = imageUrl
    if (!validateItemData(itemData)) {
        res.status(400).send()
        return
    }
    addItem(itemData)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const addItem = async (itemData: ServerItemData): Promise<void> => {
    const counterDocRef = db.collection('counters').doc('items')
    try {
        const idNumber = await db.runTransaction(async (t) => {
            const itemsCounterDoc: any = await t.get(counterDocRef)
            const counter = itemsCounterDoc.data().counter
            const id = (counter as number) + 1
            t.update(counterDocRef, { counter: id })
            return id
        })
        const idNumberString = idNumber.toString().padStart(6, '0')
        const id = `${itemData.type}-${idNumberString}`
        itemData.id = id
        const docRef = db.collection('items').doc(id)
        await docRef.set(itemData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
