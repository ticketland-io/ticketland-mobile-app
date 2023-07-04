import Config from 'react-native-config'
import fetch, {createBearerHeader} from './api'

export const verifyTicket = async (
  cntSuiAddress,
  eventId,
  codeChallenge,
  ticketOwnerPubkey,
  sig,
) => await fetch(
  `${Config.TICKETLAND_API}/cnts/${cntSuiAddress}/verifications`,
  'POST',
  {
    body: {
      event_id: eventId,
      code_challenge: codeChallenge,
      ticket_owner_pubkey: ticketOwnerPubkey,
      sig,
    },
  },
)

export const fetchTicket = async (firebase, cntSuiAddress) => {
  const {result} = await fetch(
    `${Config.TICKETLAND_API}/cnts/${cntSuiAddress}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    },
  )

  return result[0]
}

export const fetchTickets = async (firebase, eventId) => await fetch(
  `${Config.TICKETLAND_API}/cnts/current-user?event_id=${eventId}`,
  'GET',
  {
    headers: createBearerHeader(await firebase.accessToken()),
  },
)

export const normalizeEventId = eventId => eventId.replaceAll('-', '')
