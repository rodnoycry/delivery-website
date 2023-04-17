import { InputStates } from '@/redux/slices/inputStatesSlice'
import { DetailedInputData } from '@/interfaces'

export const checkErrors = (
    inputStates: InputStates | Record<keyof InputStates, DetailedInputData>,
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
