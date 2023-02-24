import type { Request, Response } from 'express'
// import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../firebase'
import { ItemData } from '@/interfaces'

// Add item to db
export const handleAddItem = (req: Request, res: Response): void => {
    const filename = req.file?.filename
    console.log(req.file?.filename)
    // Construct the URL of the uploaded file
    const imageUrl = `/images/items/${filename ?? ''}`
    const itemData = JSON.parse(req.body.itemData)
    itemData.image = imageUrl
    addItem(itemData)
        .then(() => {
            return res.status(201).send()
        })
        .catch((error) => {
            console.error(error)
            return res.status(500).json({ error }).send()
        })
}

const addItem = async (itemData: ItemData): Promise<void> => {
    const counterDocRef = db.collection('counters').doc('items')
    // const increment = FieldValue.increment(1)
    try {
        const id = await db.runTransaction(async (t) => {
            const itemsCounterDoc: any = await t.get(counterDocRef)
            const counter = itemsCounterDoc.data().counter
            const id = (counter as number) + 1
            t.update(counterDocRef, { counter: id })
            return id
        })

        const docRef = db
            .collection('items')
            .doc(id.toString().padStart(6, '0'))
        await docRef.set(itemData)
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
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
