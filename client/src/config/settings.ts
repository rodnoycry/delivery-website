type DbSelect = 'main' | 'reserve'

export const isProd = false // Change if production mode //

export const prodDomain = 'https://your_domain.com'

export const prodDomain = 'https://your_domain'

export const dbSelect: DbSelect = 'reserve'

export const domain = isProd ? prodDomain : 'http://localhost:3000'
