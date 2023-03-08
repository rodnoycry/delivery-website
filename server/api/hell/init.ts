import fs from 'fs'
import { db } from '../../firebase'
import carouselsJSON from './stored/carousels.json'
import countersJSON from './stored/counters.json'
import itemsJSON from './stored/items.json'
import ordersJSON from './stored/orders.json'
import promosJSON from './stored/promos.json'

const store = (dbKey: string): void => {
    const ref = db.collection(dbKey)
    ref.get()
        .then((docData) => {
            const itemsRaw = docData.docs
            const items = itemsRaw.map((doc) => doc.data())
            const jsonItems = JSON.stringify(items)
            fs.writeFile(
                `./server/api/hell_/stored/${dbKey}.json`,
                jsonItems,
                (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log('Data written to file')
                    }
                }
            )
        })
        .catch((error) => {
            console.error(error)
        })
}
// store('counters')
// store('carousels')
// store('items')
// store('orders')
// store('promos')

const cloneSingle = (dbKey: string, dbValue: Record<string, any>): void => {
    console.log(`data`, dbValue)
    const collectionRef = db.collection(dbKey)
    Object.entries(dbValue).forEach(([key, value]) => {
        collectionRef
            .doc(value.id)
            .set(value)
            .then(() => {
                console.log('Collection successfully created!')
            })
            .catch((error) => {
                console.error('Error creating collection: ', error)
            })
    })
}

// cloneSingle('counters', JSON.parse(JSON.stringify(countersJSON)))
// cloneSingle('carousels', JSON.parse(JSON.stringify(carouselsJSON)))
// cloneSingle('items', JSON.parse(JSON.stringify(itemsJSON)))
// cloneSingle('orders', JSON.parse(JSON.stringify(ordersJSON)))
// cloneSingle('promos', JSON.parse(JSON.stringify(promosJSON)))

// const clone = (dbKeys: string[]): void => {
//     dbKeys.forEach((dbKey) => {
//         // Read the data from the 'data.json' file
//         fs.readFile(
//             `./server/api/hell/stored/${dbKey}.json`,
//             'utf8',
//             (err, data) => {
//                 if (err) {
//                     console.error(err)
//                 } else {
//                     console.log(`data`, data)
//                     const jsonData = JSON.parse(data)
//                     console.log(`data`, jsonData)
//                     const collectionRef = db.collection(dbKey)
//                     collectionRef
//                         .doc()
//                         .set(jsonData)
//                         .then(() => {
//                             console.log('Collection successfully created!')
//                         })
//                         .catch((error) => {
//                             console.error('Error creating collection: ', error)
//                         })
//                 }
//             }
//         )
//     })
// }

// const dbKeys = ['counters', 'carousels', 'items', 'orders', 'promos']
// // clone(dbKeys)
