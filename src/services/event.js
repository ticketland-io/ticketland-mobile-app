import fetch, {createBearerHeader} from './api'

export const fetchAllEvents = async (skip = 0, limit = 5) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events?skip=${skip}&limit=${limit}`,
    'GET'
  )
}

export const get_event_cover_image_path = (eventId, fileType) => {
  return `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-cover_image.${fileType}`
}
