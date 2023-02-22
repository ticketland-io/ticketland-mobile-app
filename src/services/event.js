import fetch, {createBearerHeader} from './api'
import Config from 'react-native-config';
import qs from 'qs'

export const fetchUserEvents = async (firebase, params) => {
  const query = qs.stringify({
    search: params.search === '' ? null : params.search,
    start_date_from: params.startDateFrom ? String(params.startDateFrom) : null,
    start_date_to: params.startDateTo ? String(params.startDateTo) : null,
    skip: params.skip ? params.skip : 0,
    limit: params.limit ? params.limit : 5
  }, {skipNulls: true, encode: false})

  return await fetch(
    `${Config.TICKETLAND_API}/events/current-user?${query}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const fetchEvent = async (firebase, eventId) => {
  return await fetch(
    `${Config.TICKETLAND_API}/events/${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )
}

export const fetchAttendedCount = async (firebase, eventId) => {
  return await fetch(
    `${Config.TICKETLAND_API}/events/${eventId}/attended-count`,
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
