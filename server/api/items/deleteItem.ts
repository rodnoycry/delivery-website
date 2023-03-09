import type { Request, Response } from 'express'
import { cacheItemsDb } from '../../functions/cacheDb'
import { db } from '../../firebase'

// Add item to db
export const handleDeleteItem = (req: Request, res: Response): void => {
    deleteItem(req.body.itemId)
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

const deleteItem = async (id: string): Promise<void> => {
    try {
        const docRef = db.collection('items').doc(id)
        await docRef.update({ isActive: false })
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
