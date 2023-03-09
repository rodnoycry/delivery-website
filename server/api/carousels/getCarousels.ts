import type { Request, Response } from 'express'
import { db } from '../../firebase'

// Return all carousels
export const handleGetCarousels = (req: Request, res: Response): void => {
    getCarousels()
        .then((carousels) => {
            // console.log(`carousels geted`)
            res.status(200).json(carousels).send()
        })
        .catch((error) => {
            res.status(500).json({ error }).send()
        })
}

const getCarousels = async (): Promise<any> => {
    const ref = db.collection('carousels')
    const docData = await ref.where('isActive', '==', true).get()
    const carouselsRaw = docData.docs
    const carousels = carouselsRaw.map((doc) => doc.data())
    return carousels
}
