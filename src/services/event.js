import fetch, {createBearerHeader} from './api'
import {TICKETLAND_API} from "@env"

export const fetchUserEvents = async (firebase, skip = 0, limit = 5) => {
  return await fetch(
    `${process.env.TICKETLAND_API}/events/current-user?skip=${skip}&limit=${limit}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const fetchEvent = async (firebase, eventId) => {
  return await fetch(
    `${TICKETLAND_API}/events/${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const fetchAttendedCount = async (firebase, eventId) => {
  return await fetch(
    `${TICKETLAND_API}/events/${eventId}/attended-count`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const get_event_cover_image_path = (eventId, fileType) => {
  return `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-cover_image.${fileType}`
}

export const get_event_ticket_image_path = (eventId, fileType) => {
  return `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-ticket_image.${fileType}`
}

export const get_event_metadata_path = (eventId) => {
  return `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-event_metadata.json`
}
