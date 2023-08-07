export { zoneDeliveryInfo } from '@/config'

export const adminEmails = ['vkhk99@gmail.com', 'kubmad.kg@gmail.com']

export const prodDomain = 'https://your_domain.com'

type DbSelect = 'main' | 'reserve'

interface ServerConfig {
    isProduction: boolean
    db: DbSelect
    shouldCache: boolean
    allowDevClient: boolean
}

// MAIN CONFIG
export const config: ServerConfig = {
    isProduction: false,
    db: 'reserve', // DB SELECTION
    shouldCache: true,
    allowDevClient: true,
}
