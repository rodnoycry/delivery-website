import { isProd } from '@/config'

export const domain = isProd ? '' : 'http://localhost:3000'
