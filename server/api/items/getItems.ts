import type { Request, Response } from 'express'
// import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../firebase'
import { ItemData } from '@/interfaces'

// Return all items
export const handleItemsRequest = (req: Request, res: Response): void => {
    const ids = req.body.ids
    const type = req.body.type
    const search = req.body.search
    getItems(type)
        .then((itemsRaw) => {
            const items = itemsRaw.map(
                (
                    doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
                ) => doc.data()
            )
            if (!search && !ids) {
                res.status(200).json(items)
            }
            if (ids) {
                const result = items.filter((item: ItemData) => {
                    return ids.includes(item.id)
                })
                res.status(200).json(result)
            }
            if (search) {
                const result = items.filter((item: ItemData) => {
                    return item.name.includes(search)
                })
                res.status(200).json(result)
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

const getItems = async (type: string | null): Promise<any> => {
    const ref = db.collection('items')
    let docData
    if (type) {
        docData = await ref
            .where('isActive', '==', true)
            .where('type', '==', type)
            .get()
    } else {
        docData = await ref.where('isActive', '==', true).get()
    }
    const items = docData.docs
    return items
}
