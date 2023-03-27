import {endOfDay} from 'date-fns'

const timeOffset = new Date().getTimezoneOffset() * 60000

export const getStartOfDay = () => {
  const date = new Date()
  const startOfDayUTC = new Date(endOfDay(date).setUTCHours(0, 0, 0, 0))

  return Math.floor(Date.parse(startOfDayUTC) / 1000)
}
export const getEndOfDay = () => {
  const date = new Date()
  const endOfDayUTC = new Date(endOfDay(date).setUTCHours(23, 59, 59, 999))

  return Math.floor(Date.parse(endOfDayUTC) / 1000)
}

export const getStartOfTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const startOfDayUTC = new Date(endOfDay(tomorrow).setUTCHours(0, 0, 0, 0))

  return Math.floor(Date.parse(startOfDayUTC) / 1000)
}

export const MS_IN_SECOND = 1000

export const duration = {
  milliseconds(val) {
    return val
  },
  seconds(val) {
    return val * this.milliseconds(MS_IN_SECOND)
  },
  minutes(val) {
    return val * this.seconds(60)
  },
  hours(val) {
    return val * this.minutes(60)
  },
  days(val) {
    return val * this.hours(24)
  },
  weeks(val) {
    return val * this.days(7)
  },
  years(val) {
    return val * this.days(365)
  },
}
