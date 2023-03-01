import axios from 'axios'
import { User } from 'firebase/auth'
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

export const getIsAdmin = async (
    user: User,
    setIsAdmin: (isAdmin: boolean) => void
): Promise<boolean> => {
    if (!user) {
        return false
    }
    const isAdmin_ = await user
        .getIdToken()
        .then(async (token) => await getIsAdminFromServer({ idToken: token }))
        .then((isAdmin) => {
            setIsAdmin(isAdmin)
            console.log(`isAdmin = `, isAdmin)
            return isAdmin
        })
        .catch((error) => {
            console.log(error.message)
            return false
        })
    return isAdmin_
}
