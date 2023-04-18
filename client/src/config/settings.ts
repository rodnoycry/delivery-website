type DbSelect = 'main' | 'reserve'

export const isProd = false // Change if production mode

export const dbSelect: DbSelect = 'reserve'

export const domain = isProd ? 'http://your_domain' : 'http://localhost:3000'
