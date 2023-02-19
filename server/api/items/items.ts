import type { Request, Response } from 'express'

export const handleItemsRequest = (
    req: Request,
    res: Response
): Response | undefined => {
    if (req) {
        return res.status(422).json({ errors: '' })
    }
    const { name, email } = req.body
    return res.status(201).json({ status: 'success', data: { name, email } })
}
