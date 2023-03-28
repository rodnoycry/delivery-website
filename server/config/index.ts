export { zoneDeliveryInfo } from '@/config'

export const adminEmails = ['vkhk99@gmail.com', 'kubmad.kg@gmail.com']

type DbSelect = 'main' | 'reserve'

interface ServerConfig {
    db: DbSelect
    shouldCache: boolean
    allowDevClient: boolean
}

// MAIN CONFIG
export const config: ServerConfig = {
    db: 'main', // DB SELECTION
    shouldCache: false,
    allowDevClient: true,
}
