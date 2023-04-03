import {verifyTicket} from './ticket'
import {validateServerVerificationResponse} from '@ticketland-io/ticket-verification-js'
import Config from 'react-native-config';

export const verifyTicketService = async (eventId, codeChallenge, ticketMetadata, ticketNft, ticketOwnerPubkey, sig) => {
  try {
    const response = await verifyTicket(
      ticketMetadata,
      ticketNft,
      eventId,
      codeChallenge,
      ticketOwnerPubkey,
      sig
    )

    const validationResult = await validateServerVerificationResponse(
      codeChallenge,
      response,
      Config.TICKETLAND_API_PUBKEY,
    )

    return {response, validationResult}

  } catch (error) {
    // Ignore
    console.log(error)
  }
}
