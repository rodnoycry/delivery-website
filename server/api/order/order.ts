import type { Request, Response } from 'express'

export const handleTestRequest = (
    req: Request,
    res: Response
): Response | undefined => {
    const errors = ''
    if (!errors) {
        return res.status(422).json({ errors })
    }
    const { name, email } = req.body
    res.status(201).json({ status: 'success', data: { name, email } })
}
