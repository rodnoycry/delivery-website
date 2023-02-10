import { Order } from '@/redux/slices/orderSlice'

export const checkErrors = (
    inputStates: Order | Record<string, string>,
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
