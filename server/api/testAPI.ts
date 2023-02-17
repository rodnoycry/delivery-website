import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const handleTestRequest = (
    req: Request,
    res: Response
): Response | undefined => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { name, email } = req.body
    res.status(201).json({ status: 'success', data: { name, email } })
}
