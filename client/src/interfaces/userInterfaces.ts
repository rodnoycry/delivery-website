import { InputStates } from '@/redux/slices/inputStatesSlice'

export type userOrderStatus = 'new' | 'inProcess' | 'done'

export interface UserOrderData {
    id: string
    status: userOrderStatus
    isNewStatus: boolean
}

export interface UserData {
    isLoggedIn: boolean
    displayName?: string
    email?: string
    phone?: string
    ordersData?: UserOrderData[]
    inputStates?: InputStates
}

export interface CartItem {
    id: string
    selected: number | boolean
}
