import { DecodedIdToken } from 'firebase-admin/auth'
import { cacheUsersDb } from '../../../functions/cacheDb'
import { db } from '../../../firebase'

export const createUser = async (
    decodedToken: DecodedIdToken,
    displayName?: string
): Promise<void> => {
    try {
        const uid = decodedToken.uid
        const userData: Record<string, string> = {
            id: uid,
        }
        if (displayName) {
            userData.displayName = displayName
        }
        if (decodedToken?.email) {
            userData.email = decodedToken.email
        }
        const docRef = db.collection('users').doc(uid)
        await docRef.set(userData)
        await cacheUsersDb()
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
