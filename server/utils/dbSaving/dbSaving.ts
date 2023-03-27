import fs from 'fs'
import { initializeApp, cert } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin'
import { getFirestore } from 'firebase-admin/firestore'
import type { Firestore } from 'firebase-admin/firestore'
import * as serviceAccountReserve from '../../config/serviceAccountKeyReserve.json'
import * as serviceAccountMain from '../../config/serviceAccountKey.json'

import carouselsJSON from './stored/carousels.json'
import countersJSON from './stored/counters.json'
import itemsJSON from './stored/items.json'
import ordersJSON from './stored/orders.json'
import promosJSON from './stored/promos.json'
import usersJSON from './stored/users.json'

// MAIN DB
export const mainApp = initializeApp(
    {
        credential: cert(serviceAccountMain as ServiceAccount),
    },
    'main'
)
export const mainDb = getFirestore(mainApp)

// RESERVE DB
export const reserveApp = initializeApp(
    {
        credential: cert(serviceAccountReserve as ServiceAccount),
    },
    'reserve'
)
export const reserveDb = getFirestore(reserveApp)

const dbDict = {
    main: mainDb,
    reserve: reserveDb,
}

const storedJSONDict = {
    counters: countersJSON,
    carousels: carouselsJSON,
    items: itemsJSON,
    orders: ordersJSON,
    promos: promosJSON,
    users: usersJSON,
}

export const store = (dbProvider: Firestore, dbKey: string): void => {
    const ref = dbProvider.collection(dbKey)
    ref.get()
        .then((docData) => {
            const itemsRaw = docData.docs
            const items = itemsRaw.map((doc) => doc.data())
            const jsonItems = JSON.stringify(items)
            fs.writeFile(
                `./server/utils/dbSaving/stored/${dbKey}.json`,
                jsonItems,
                (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log(`Collection ${dbKey} written to file`)
                    }
                }
            )
        })
        .catch((error) => {
            console.error(error)
        })
}

export const fetchFromDb = (
    dbProviderName: keyof typeof dbDict,
    dbkeys?: Array<keyof typeof storedJSONDict>
): void => {
    const dbProvider = dbDict[dbProviderName]
    let dbKeys = dbkeys
    if (!dbkeys) {
        dbKeys = Object.keys(storedJSONDict) as Array<
            keyof typeof storedJSONDict
        >
    }
    console.log(
        `Fetching from $${dbProviderName}$ started, saving next collections:`,
        dbKeys
    )
    dbKeys?.forEach((dbKey) => {
        store(dbProvider, dbKey)
    })
}

// store('counters')
// store('carousels')
// store('items')
// store('orders')
// store('promos')

export const sendToDb = (
    dbProviderName: keyof typeof dbDict,
    dbkeys?: Array<keyof typeof storedJSONDict>
): void => {
    const dbProvider = dbDict[dbProviderName]
    let dbKeys = dbkeys
    if (!dbkeys) {
        dbKeys = Object.keys(storedJSONDict) as Array<
            keyof typeof storedJSONDict
        >
    }
    console.log(
        `Sending to $${dbProviderName}$ started, saving next collections:`,
        dbKeys
    )
    dbKeys?.forEach((dbKey) => {
        const dbValue = JSON.parse(JSON.stringify(storedJSONDict[dbKey]))
        sendSingle(dbProvider, dbKey, dbValue)
    })
}

const sendSingle = (
    dbProvider: Firestore,
    dbKey: string,
    dbValue: Record<string, any>
): void => {
    const collectionRef = dbProvider.collection(dbKey)
    Object.entries(dbValue).forEach(([key, value]) => {
        collectionRef
            .doc(value.id)
            .set(value)
            .then(() => {
                console.log(`Collection ${dbKey} successfully created!`)
            })
            .catch((error) => {
                console.error(`Error creating collection ${dbKey}: `, error)
            })
    })
}

// sendSingle('counters', JSON.parse(JSON.stringify(countersJSON)))
// sendSingle('carousels', JSON.parse(JSON.stringify(carouselsJSON)))
// sendSingle('items', JSON.parse(JSON.stringify(itemsJSON)))
// sendSingle('orders', JSON.parse(JSON.stringify(ordersJSON)))
// sendSingle('promos', JSON.parse(JSON.stringify(promosJSON)))

// const dbKeys = ['counters', 'carousels', 'items', 'orders', 'promos']
// // clone(dbKeys)
