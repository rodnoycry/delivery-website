import axios from 'axios'
import { domain } from './config'

export const getIsAdminFromServer = async (data: {
    idToken: string
}): Promise<boolean> => {
    try {
        const response = await axios.post(`${domain}/api/admin/check`, data)
        return response.data.isAdmin
    } catch (error: any) {
        console.log(error.message)
        return false
    }
}
