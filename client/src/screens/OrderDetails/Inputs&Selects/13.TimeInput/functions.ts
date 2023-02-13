export const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':')
    let hour = parseInt(hours)
    let minute = parseInt(minutes)

    if (isNaN(hour)) {
        hour = 0
    }

    if (isNaN(minute)) {
        minute = 0
    }

    if (hour < 0 || hour > 23) {
        hour = 0
    }

    if (minute < 0 || minute > 59) {
        minute = 0
    }

    return `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`
}
