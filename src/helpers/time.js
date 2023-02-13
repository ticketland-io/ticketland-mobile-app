import {endOfDay, startOfDay, startOfTomorrow} from 'date-fns'

export const getStartOfDay = () => Math.floor((startOfDay(Date.now())).getTime() / 1000)
export const getEndOfDay = () => Math.floor((endOfDay(Date.now())).getTime() / 1000)
export const getStartOfTomorrow = () => Math.floor((startOfTomorrow(Date.now())).getTime() / 1000)
