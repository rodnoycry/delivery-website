import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { ServerItemData } from '@/interfaces'

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

const getIntegerPrice = (price: string | string[]): number | number[] => {
    if (Array.isArray(price)) {
        return price.map(parseInt)
    } else {
        return parseInt(price)
    }
}

const validateItemData = ({ type, name, price }: ServerItemData): boolean => {
    let isValid = true
    if (!name) {
        isValid = false
    }
    if (['pizza', 'wok'].includes(type)) {
        isValid = !!Array.isArray(price)
    } else {
        isValid = typeof price === 'string'
    }
    return isValid
}

const addItem = async (itemData: ServerItemData): Promise<void> => {
    const counterDocRef = db.collection('counters').doc('items')
    try {
        const id = await db.runTransaction(async (t) => {
            const itemsCounterDoc: any = await t.get(counterDocRef)
            const counter = itemsCounterDoc.data().counter
            const id = (counter as number) + 1
            t.update(counterDocRef, { counter: id })
            return id
        })
        const stringId = id.toString().padStart(6, '0')
        itemData.id = stringId
        const docRef = db.collection('items').doc(stringId)
        await docRef.set(itemData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
