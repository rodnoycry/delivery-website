// User related

export type userOrderStatus = 'new' | 'inProcess' | 'done'

export interface UserData {
    isLoggedIn: boolean
    email?: string
    displayName?: string
    phone?: string
    ordersData?: Record<
        string,
        {
            id: string
            status: userOrderStatus
            isViewed: boolean
        }
    >
}
