export const getCurrentWeekInRussian = (): string[] => {
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

    const today = new Date()
    const currentDate = today.getUTCDate()
    const currentMonth = months[today.getUTCMonth()]

    const currentWeek = [`${currentDate} ${currentMonth}`]

    for (let i = 1; i < 7; i++) {
        const nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
        const nextDate = nextDay.getUTCDate()
        const nextMonth = months[nextDay.getUTCMonth()]

        currentWeek.push(`${nextDate} ${nextMonth}`)
    }

    return currentWeek
}

export const getDatesOptions = (): Array<{ label: string; value: string }> => {
    return getCurrentWeekInRussian().map((day) => {
        return { label: day, value: day }
    })
}
