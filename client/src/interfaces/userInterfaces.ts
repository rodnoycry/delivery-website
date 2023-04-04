import { Order } from '@/redux/slices/orderSlice'

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
    inputStates?: Order
}

export interface CartItem {
    id: string
    selected: number | boolean
}
