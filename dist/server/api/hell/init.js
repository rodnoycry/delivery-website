"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const firebase_1 = require("../../firebase");
const store = (dbKey) => {
    const ref = firebase_1.db.collection(dbKey);
    ref.get()
        .then((docData) => {
        const itemsRaw = docData.docs;
        const items = itemsRaw.map((doc) => doc.data());
        const jsonItems = JSON.stringify(items);
        fs_1.default.writeFile(`./server/api/hell_/stored/${dbKey}.json`, jsonItems, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Data written to file');
            }
        });
    })
        .catch((error) => {
        console.error(error);
    });
};
// store('counters')
// store('carousels')
// store('items')
// store('orders')
// store('promos')
const sendSingle = (dbKey, dbValue) => {
    console.log(`data`, dbValue);
    const collectionRef = firebase_1.db.collection(dbKey);
    Object.entries(dbValue).forEach(([key, value]) => {
        collectionRef
            .doc(value.id)
            .set(value)
            .then(() => {
            console.log('Collection successfully created!');
        })
            .catch((error) => {
            console.error('Error creating collection: ', error);
        });
    });
};
// sendSingle('counters', JSON.parse(JSON.stringify(countersJSON)))
// sendSingle('carousels', JSON.parse(JSON.stringify(carouselsJSON)))
// sendSingle('items', JSON.parse(JSON.stringify(itemsJSON)))
// sendSingle('orders', JSON.parse(JSON.stringify(ordersJSON)))
// sendSingle('promos', JSON.parse(JSON.stringify(promosJSON)))
// const send = (dbKeys: string[]): void => {
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
//# sourceMappingURL=init.js.map