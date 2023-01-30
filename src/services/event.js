import fetch, {createBearerHeader} from './api'

export const fetchAllEvents = async (skip = 0, limit = 5) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events?skip=${skip}&limit=${limit}`,
    'GET'
  )
}
