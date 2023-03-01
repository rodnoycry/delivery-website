import type { Request, Response } from 'express'
import { FieldPath } from 'firebase-admin/firestore'
// import { FieldValue } from 'firebase-admin/firestore'
import { db } from '../../firebase'
import { ItemData } from '@/interfaces'

// Return all items
export const handleItemsRequest = (req: Request, res: Response): void => {
    const ids = req.body.ids
    const type = req.body.type
    const search = req.body.search
    getItems(type, search, ids)
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
                res.status(200).json(items)
            }
            if (search) {
                const result = items.filter((item: ItemData) => {
                    return item.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                })
                res.status(200).json(result)
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

const getItems = async (
    type: string | null,
    search: string | null,
    ids?: string[]
): Promise<any> => {
    const ref = db.collection('items')
    let docData
    if (type) {
        docData = await ref
            .where('type', '==', type)
            .where('isActive', '==', true)
            .get()
    } else if (ids) {
        docData = await ref
            .where(FieldPath.documentId(), 'in', ids)
            .where('isActive', '==', true)
            .get()
    } else if (search) {
        docData = await ref.where('isActive', '==', true).get()
    } else {
        docData = await ref.get()
    }
    const items = docData.docs
    return items
}
