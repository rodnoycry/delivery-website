import { Order } from '@/redux/slices/orderSlice'
import { DetailedInputData } from '@/interfaces'

export const checkErrors = (
    inputStates: Order | Record<keyof Order, DetailedInputData>,
    requiredInputs: string[]
): boolean => {
    if (inputStates === undefined) {
        return false
    }
    let hasError = false
    Object.entries(inputStates).forEach(([key, value]) => {
        if (key !== `zone` && requiredInputs.includes(key)) {
            hasError = !!(hasError || value?.hasError)
        }
    })
    return hasError
}
