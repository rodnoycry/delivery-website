import axios from 'axios'
import { domain } from './config'

interface TestData {
    name: string
    email: string
}

export const sendDataToServer = (data: TestData): TestData | any => {
    axios
        .post(`${domain}/api/test`, data)
        .then((response) => {
            // handle success
            return response
        })
        .catch((error) => {
            // handle error
            console.log(error)
            return error.message
        })
}

export const createSampleUser = async (): Promise<void> => {
    try {
        const response = await axios.post(`${domain}/api/users/add`)
    } catch (error) {
        console.error(error)
    }
}
