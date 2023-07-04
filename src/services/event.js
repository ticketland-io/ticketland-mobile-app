import Config from 'react-native-config'
import qs from 'qs'
import fetch, {createBearerHeader} from './api'

export const fetchEvents = async (firebase, params, mode) => {
  const query = qs.stringify({
    search: params.search === '' ? null : params.search,
    start_date_from: params.startDateFrom ? String(params.startDateFrom) : null,
    start_date_to: params.startDateTo ? String(params.startDateTo) : null,
    end_date_from: params.endDateFrom ? String(params.endDateFrom) : null,
    end_date_to: params.endDateTo ? String(params.endDateTo) : null,
    skip: params.skip ? params.skip : 0,
    limit: params.limit ? params.limit : 5,
  }, {skipNulls: true, encode: false})

  switch (mode) {
    case 'organizer':
      return await fetch(
        `${Config.TICKETLAND_API}/events/current-user?${query}`,
        'GET',
        {
          headers: createBearerHeader(await firebase.accessToken()),
        },
      )
    case 'user':
    default:
      return await fetch(
        `${Config.TICKETLAND_API}/events/ticket-holder?${query}`,
        'GET',
        {
          headers: createBearerHeader(await firebase.accessToken()),
        },
      )
  }
}

export const fetchEvent = async (firebase, eventId) => await fetch(
  `${Config.TICKETLAND_API}/events/${eventId}`,
  'GET',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const fetchAttendedCount = async (firebase, eventId) => await fetch(
  `${Config.TICKETLAND_API}/events/${eventId}/attended-count`,
  'GET',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const getEventCoverImagePath = eventId => (
  `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-cover_image`
)

export const getTicketNftImagePath = (eventId, nftRefName) => (
  `https://ticketland-metadata.s3.eu-central-1.amazonaws.com/${eventId}-nft_file_${nftRefName}`
)
