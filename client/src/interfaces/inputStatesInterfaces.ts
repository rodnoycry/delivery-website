export interface InputState {
    value?: string
    selected?: {
        label: string
        value: string
    }
    hasError?: boolean
    isRed?: boolean
    onFocus?: boolean
}
