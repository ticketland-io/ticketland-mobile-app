import Config from 'react-native-config';
import fetch, {createBearerHeader} from "./api"

export const verifyTicket = async (
  ticketMetadata,
  ticketNft,
  eventId,
  codeChallenge,
  ticketOwnerPubkey,
  sig
) => {
  return await fetch(
    `${Config.TICKETLAND_API}/tickets/${ticketNft}/verifications`,
    'POST',
    {
      body: {
        event_id: eventId,
        code_challenge: codeChallenge,
        ticket_owner_pubkey: ticketOwnerPubkey,
        ticket_metadata: ticketMetadata,
        ticket_nft: ticketNft,
        sig,
      }
    }
  )
}

export const fetchTicket = async (firebase, ticketNft) => {
  const {result} = await fetch(
    `${Config.TICKETLAND_API}/tickets/${ticketNft}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken())
    }
  )

  return result[0]
}

export const fetchTickets = async (firebase, eventId) => {
  return await fetch(
    `${Config.TICKETLAND_API}/tickets/current-user?event_id=${eventId}`,
    'GET',
    {
      headers: createBearerHeader(await firebase.accessToken()),
    }
  )
}

export const normalizeEventId = eventId => eventId.replaceAll('-', '')
