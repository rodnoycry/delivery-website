import { initializeApp, cert } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { config } from './config'
import * as serviceAccountReserve from './config/serviceAccountKeyReserve.json'
import * as serviceAccountMain from './config/serviceAccountKey.json'

const serviceAccountDict = {
    main: serviceAccountMain,
    reserve: serviceAccountReserve,
}

export const app = initializeApp({
    credential: cert(serviceAccountDict[config.db] as ServiceAccount),
    // databaseURL: 'https://san-sei.firebaseio.com',
})

export const auth = getAuth(app)
export const db = getFirestore()
