import { DecodedIdToken } from 'firebase-admin/auth'
import { cacheUsersDb, getOrdersFromCache } from '../../../functions/cacheDb'
import { getCurrentDayRussian } from '../../../functions'
import { UserData, UserOrderData, userOrderStatus } from '../../../interfaces'

import { db } from '../../../firebase'

export const createUser = async (
    decodedToken: DecodedIdToken,
    sessionId: string | undefined,
    userDataFromRequest: UserData
): Promise<void> => {
    try {
        const uid = decodedToken.uid
        const userData: Record<string, any> = {
            id: uid,
            ...userDataFromRequest,
        }
        if (decodedToken?.email) {
            userData.email = decodedToken.email
        }
        if (sessionId) {
            userData.orders = await getAndUpdateRecentOrders(uid, sessionId)
        }
        const docRef = db.collection('users').doc(uid)
        await docRef.set(userData)
        await cacheUsersDb()
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}

const getAndUpdateRecentOrders = async (
    uid: string,
    sessionId: string
): Promise<UserOrderData[]> => {
    try {
        const ordersDb = await getOrdersFromCache()
        const currentDateRussian = getCurrentDayRussian()
        const filteredOrders = ordersDb.filter((order) => {
            return (
                order?.sessionId === sessionId &&
                order.date === currentDateRussian
            )
        })
        const orderIds: string[] = []
        const result = filteredOrders.map((order) => {
            orderIds.push(order.id)
            const status = order?.status || 'done'
            const isNewStatus = order?.isNewStatus || false
            const result: UserOrderData = {
                id: order.id as string,
                status: status as userOrderStatus,
                isNewStatus,
            }
            return result
        })
        const batch = db.batch()
        const ordersCollection = db.collection('orders')
        orderIds.forEach((id) => {
            const orderRef = ordersCollection.doc(id)
            batch.update(orderRef, { uid })
        })
        await batch.commit()
        return result
    } catch (error) {
        console.error(error)
        throw new Error(`getAndUpdateRecentOrders error`)
    }
}
