import type { Request, Response } from 'express'
import { getItemsFromCache } from '../../functions/cacheDb'
import { ServerItemData } from '@/interfaces'

// Return all items
export const handleItemsRequest = (req: Request, res: Response): void => {
    const ids = req.body.ids
    const type = req.body.type
    const search = req.body.search
    getItems(type, search, ids)
        .then((items) => {
            res.status(200).json(items)
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ error })
        })
}

const getItems = async (
    type: string | null,
    search: string | null,
    ids?: string[]
): Promise<ServerItemData[]> => {
    const items = await getItemsFromCache()
    if (type) {
        if (search) {
            return items.filter(
                (item) =>
                    item.isActive &&
                    item.type === type &&
                    item.name.toLowerCase().includes(search.toLowerCase())
            )
        }
        return items.filter((item) => item.isActive && item.type === type)
    }
    if (ids) {
        return items.filter((item) => item.isActive && ids.includes(item.id))
    }
    if (search) {
        return items.filter(
            (item) =>
                item.isActive &&
                item.name.toLowerCase().includes(search.toLowerCase())
        )
    }
    return items
}
