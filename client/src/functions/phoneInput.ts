import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'

export const formatPhoneNumber = (inputNumber: string): string => {
    inputNumber = '+7' + inputNumber.substring(2)
    const digits = inputNumber.match(/\d/g)
    const digitsQty = digits ? digits.length : 0
    if (digitsQty > 11) {
        inputNumber = inputNumber.substring(0, inputNumber.length - 1)
    }
    return new AsYouType().input(inputNumber)
}

export const validatePhoneNumber = (value: string): boolean =>
    isValidPhoneNumber(value) && value.length > 2
