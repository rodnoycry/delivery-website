import { ServerOrder } from '@/interfaces'

export const getOrdersHasNewStatuses = (orders: ServerOrder[]): boolean => {
    let shouldNotify = false
    orders.forEach((order) => {
        if (order.isNewStatus) {
            shouldNotify = true
        }
    })
    return shouldNotify
}
