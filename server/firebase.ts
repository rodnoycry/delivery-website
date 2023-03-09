import { initializeApp, cert } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import * as serviceAccount from './config/serviceAccountKeyReserve.json'

export const app = initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
    // databaseURL: 'https://san-sei.firebaseio.com',
})

export const auth = getAuth(app)
export const db = getFirestore()
