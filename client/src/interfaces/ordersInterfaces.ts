import { CartItem } from '@/interfaces'
import { Zone } from '@/redux/slices/inputStatesSlice'

// Orders related
export interface ServerOrder {
    id: string
    // Main data
    time: string
    date: string
    zone: string | Zone['zone']
    cart: CartItem[]
    sum: number
    // Inputs and selects data
    phone: string
    name: string
    deliveryType: string
    locality: string
    street: string
    house: string
    apartment: string
    entrance: string
    intercom: string
    // Part 2
    personQty: string
    deliveryTimeType: string
    deliveryDay: string
    deliveryTime: string
    paymentMethod: string
    hasChange: string
    comment: string

    isActive: boolean
    status?: string
    uid?: string
    sessionId?: string
    isNewStatus?: boolean
}

export interface ErrorData {
    hasError?: boolean
    isRed?: boolean
}

export type OrderError = Record<keyof ServerOrder, ErrorData>

export interface OrderErrorData {
    errorMessage: string
    errorObject?: OrderError
}
