import { CompleteOrder } from '@/redux/slices/adminOrdersSlice'
import { CartItem } from '@/redux/slices/cartSlice'

export const getCompleteOrder = (
    time: string,
    cart: CartItem[],
    sum: number,
    storeInputStates: any
): CompleteOrder => {
    let deliveryTime = storeInputStates?.TimeInput?.value
    if (!deliveryTime) {
        const now = new Date()
        now.setHours(now.getHours() + 1)

        const hour = now.getHours().toString().padStart(2, '0')
        const minute = now.getMinutes().toString().padStart(2, '0')

        const time = `${hour}:${minute}`
        deliveryTime = time
    }

    const orderInfo: CompleteOrder = {
        time,
        cart,
        sum,
        zone: storeInputStates?.zone,
        phone: storeInputStates?.PhoneInput?.value,
        name: storeInputStates?.NameInput?.value,
        deliveryType: storeInputStates?.DeliveryTypeSelect?.selected?.value,
        locality: storeInputStates?.LocalityInput?.value,
        street: storeInputStates?.StreetInput?.value,
        house: storeInputStates?.HouseInput?.value,
        apartment: storeInputStates?.ApartmentInput?.value,
        entrance: storeInputStates?.EntranceInput?.value,
        intercom: storeInputStates?.IntercomInput?.value,

        personQty: storeInputStates?.PersonQtySelect?.selected?.value,
        deliveryTimeType: storeInputStates?.TimeSelect?.selected?.value,
        deliveryDay: storeInputStates?.DaySelect?.selected?.value,
        deliveryTime,
        paymentMethod: storeInputStates?.PaymentSelect?.selected?.value,
        hasChange: storeInputStates?.ChangeSelect?.selected?.value,
        comment: storeInputStates?.CommentInput?.value,
    }
    return orderInfo
}
