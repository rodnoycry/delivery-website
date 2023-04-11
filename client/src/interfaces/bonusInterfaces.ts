export type BonusType =
    | 'buyOneGetOneFree'
    | 'personalBonus'
    | 'limitedTimeOffer'

export type BonusDiscountType = 'percentage' | 'fixedAmount'

export interface Bonus {
    name: string
    type: BonusType
    discountType: BonusDiscountType
    discountAmount: number
    personalBonusSteps: Record<string, number>
    startDate?: Date
    endDate?: Date
    isActive: boolean
    appliesTo?: {
        itemIds: string[]
        discountForItemIds?: string[]
    }
}
