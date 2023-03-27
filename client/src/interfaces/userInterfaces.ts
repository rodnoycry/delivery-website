import { Order } from '@/redux/slices/orderSlice'

export type userOrderStatus = 'new' | 'inProcess' | 'done'

export interface UserOrderData {
    id: string
    status: userOrderStatus
    isViewed: boolean
}

export interface UserData {
    isLoggedIn: boolean
    email?: string
    displayName?: string
    phone?: string
    ordersData?: UserOrderData[]
    inputStates?: Order
}
