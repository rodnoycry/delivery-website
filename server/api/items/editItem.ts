import type { Request, Response } from 'express'
import { db } from '../../firebase'
import { ServerItemData } from '@/interfaces'
import { getIntegerPrice, validateItemData } from './functions'
import { cacheItemsDb } from '../../functions/cacheDb'

// Add item to db
export const handleEditItem = (req: Request, res: Response): void => {
    const itemData = JSON.parse(req.body.itemData)
    if (!itemData.id) {
        res.status(400).send()
        return
    }
    const filename = req.file?.filename
    let imageUrl
    if (filename) {
        imageUrl = `/images/items/${filename}`
        itemData.image = imageUrl
    }
    itemData.price = getIntegerPrice(itemData.price)
    if (!validateItemData(itemData)) {
        res.status(400).send()
        return
    }
    editItem(itemData)
        .then(() => {
            cacheItemsDb() // Update cached items from db
                .then(() => {
                    res.status(201).send()
                })
                .catch((error) => {
                    console.log(error)
                    return res.status(500).json({ error }).send()
                })
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const editItem = async (itemData: ServerItemData): Promise<void> => {
    try {
        const docRef = db.collection('items').doc(itemData.id)
        await docRef.set(itemData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
