import fs from 'fs'
import { db } from '../../../firebase'

export const cacheDb = async (dbName: string): Promise<void> => {
    const ref = db.collection(dbName)
    try {
        const docData = await ref.get()
        const dataRaw = docData.docs
        const data = dataRaw.map((doc) => doc.data())
        const jsonData = JSON.stringify(data)
        fs.writeFileSync(`./server/db-cache/${dbName}.json`, jsonData)
        console.log(`Collection "${dbName}" written to file`)
    } catch (error) {
        console.error(error)
    }
}

export const getDataFromCache = async (dbName: string): Promise<any[]> => {
    try {
        const dataRaw = fs.readFileSync(
            `./server/db-cache/${dbName}.json`,
            'utf-8'
        )
        const data = JSON.parse(dataRaw)
        return data
    } catch (error) {
        console.error(error)
        throw new Error(`getDataFromCache error: ${dbName}`)
    }
}
