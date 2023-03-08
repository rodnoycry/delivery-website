import fs from 'fs'
import { db } from '../../firebase'
import type { Request, Response } from 'express'

export const handleStoreItemsData = (req: Request, res: Response): void => {
    const ref = db.collection('items')
    ref.get()
        .then((docData) => {
            const itemsRaw = docData.docs
            const items = itemsRaw.map((doc) => doc.data())
            const jsonItems = JSON.stringify(items)
            fs.writeFile('items.json', jsonItems, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    console.log('Data written to file')
                }
            })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).send()
        })
}
