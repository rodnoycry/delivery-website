import type { Request, Response } from 'express'
import { db } from '../../firebase'

export const handleEditOrder = (req: Request, res: Response): void => {
    const { id, isActive } = req.body.orderData
    updateOrder(id, isActive)
        .then(() => {
            res.status(204).send()
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json(error).send()
        })
}

const updateOrder = async (id: string, isActive: boolean): Promise<void> => {
    try {
        const docRef = db.collection('orders').doc(id)
        await docRef.update({ isActive })
        return
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
