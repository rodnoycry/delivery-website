import * as admin from 'firebase-admin'

export const app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://san-sei.firebaseio.com',
})
