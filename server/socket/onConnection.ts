import { auth } from '../firebase'
import { Socket } from 'socket.io'
import { socketAuthMap } from '../server'
import { getOrdersFromCache } from '../functions/cacheDb'

export const onSocketMessage = (socket: Socket, message: any): void => {
    try {
        const data = JSON.parse(message)
        if (data.type === 'getUserOrders') {
            const idToken = data.idToken
            auth.verifyIdToken(idToken)
                .then((decodedToken) => {
                    const uid = decodedToken.uid
                    if (!socketAuthMap.has(socket.id)) {
                        socketAuthMap.set(socket.id, uid)
                    }
                    getOrdersFromCache()
                        .then((orders) => {
                            const userOrders = orders.filter(
                                (order) => order.uid === uid
                            )
                            socket.emit('userOrders', userOrders)
                        })
                        .catch(console.error)
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            // Handle other message types.
        }
    } catch (error) {
        console.error(error)
    }
}
