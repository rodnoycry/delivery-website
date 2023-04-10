import { io, socketAuthMap } from '../../../server'
import { getOrdersFromCache } from '../../../functions/cacheDb'

export const sendOrdersToUserWithSocket = (uid: string): void => {
    getOrdersFromCache()
        .then((orders) => {
            const userOrders = orders.filter((order) => order.uid === uid)
            const socketIds: any[] = []
            for (const [key, value] of socketAuthMap.entries()) {
                if (value === uid) {
                    socketIds.push(key)
                }
            }
            socketIds.forEach((socketId) => {
                io.to(socketId).emit('userOrders', userOrders)
            })
        })
        .catch(console.error)
}
