import { isProd } from '@/config'

type DbSelect = 'main' | 'reserve'

export const dbSelect: DbSelect = 'reserve'

export const domain = isProd ? '' : 'http://localhost:3000'
