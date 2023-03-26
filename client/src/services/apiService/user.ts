import axios from 'axios'
import { domain } from './config'

const links = {
    getUserDataLink: `${domain}/api/users/get`,
}

export const getUserData = async (
    idToken: string,
    displayName?: string
): Promise<any> => {
    try {
        const response = await axios.post(links.getUserDataLink, {
            idToken,
            displayName,
        })
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error(`getUserData error`)
    }
}
