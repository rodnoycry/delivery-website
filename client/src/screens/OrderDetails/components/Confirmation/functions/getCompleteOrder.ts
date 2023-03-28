import { ServerOrder, CartItem } from '@/interfaces'
import { getCurrentDayRussian } from '@/functions'

export const getServerOrder = (
    time: string,
    cart: CartItem[],
    sum: number,
    storeInputStates: any
): ServerOrder => {
    let deliveryTime = storeInputStates?.TimeInput?.value
    if (!deliveryTime) {
        const now = new Date()
        now.setHours(now.getHours() + 1)

        const hour = now.getHours().toString().padStart(2, '0')
        const minute = now.getMinutes().toString().padStart(2, '0')

        const time = `${hour}:${minute}`
        deliveryTime = time
    }
    const deliveryTimeType = storeInputStates?.deliveryTimeType?.selected?.value
    let deliveryDay = storeInputStates?.DaySelect?.selected?.value
    if (
        deliveryTimeType === 'Самовывоз' &&
        !getIsDeliveryDateValid(deliveryDay)
    ) {
        deliveryDay = getCurrentDayRussian()
    }
    const orderInfo: ServerOrder = {
        id: Date.now().toString(),
        time,
        date: getCurrentDayRussian(),
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
        deliveryDay,
        deliveryTime,
        paymentMethod: storeInputStates?.PaymentSelect?.selected?.value,
        hasChange: storeInputStates?.ChangeSelect?.selected?.value,
        comment: storeInputStates?.CommentInput?.value,

        isActive: true,
    }
    return orderInfo
}

const getIsDeliveryDateValid = (dateString: string | undefined): boolean => {
    if (!dateString) {
        return false
    }
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]
    const [dayString, monthName] = dateString.split(` `)
    const dayNumber = parseInt(dayString)
    const monthNumber = months.indexOf(monthName)
    const currentDate = new Date()
    if (!isNaN(dayNumber) && monthNumber !== -1) {
        // Create a new Date object with the given day and month, and the current year
        const inputDate = new Date(
            currentDate.getFullYear(),
            monthNumber,
            dayNumber
        )

        // Calculate the difference between the input date and today's date in milliseconds
        const timeDiff = currentDate.getTime() - inputDate.getTime()

        // Calculate the difference in days by dividing the time difference by the number of milliseconds in a day
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

        // Check if the input date is not more than 7 days from today
        const isDateWithin7Days = dayDiff <= 7 && dayDiff >= 0
        return isDateWithin7Days
    } else {
        return false
    }
}
