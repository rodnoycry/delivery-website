import type { Request, Response } from 'express'
// import { FieldValue } from 'firebase-admin/firestore'
import { db } from 'server/firebase'
import { ItemData } from '@/interfaces'

// Add item to db
export const handleAddItem = (req: Request, res: Response): void => {
    addItem(req.body)
        .then(() => {
            return res.status(201)
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error })
        })
}

const addItem = async (itemData: ItemData): Promise<void> => {
    const counterDocRef = db.collection('counters').doc('items')
    // const increment = FieldValue.increment(1)
    const id = await db.runTransaction(async (t) => {
        const itemsCounterDoc: any = await t.get(counterDocRef)
        const id = (itemsCounterDoc.counter as number) + 1
        t.update(counterDocRef, { counter: id })
        return id
    })

    const docRef = db.collection('items').doc(id.toString())
    await docRef.set(itemData)
}

// Return all items
export const handleItemsRequest = (req: Request, res: Response): void => {
    const type = req.body.type
    const search = req.body.search
    getItems(type)
        .then((itemsRaw) => {
            if (!search) {
                res.status(200).json(itemsRaw)
            }
            const result = itemsRaw.filter((item: ItemData) => {
                return item.name.includes(search)
            })
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

const getItems = async (type: string | null): Promise<any> => {
    const ref = db.collection('items')
    let docData
    if (type) {
        docData = await ref.where('type', '==', type).get()
    } else {
        docData = await ref.get()
    }
    const items = docData.docs
    return items
}
