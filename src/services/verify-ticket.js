import {validateServerVerificationResponse} from '@ticketland-io/ticket-verification-js'
import Config from 'react-native-config'
import {verifyTicket} from './ticket'

export const verifyTicketService = async (eventId, codeChallenge, cntSuiAddress, ticketOwnerPubkey, sig) => {
  try {
    const response = await verifyTicket(
      cntSuiAddress,
      eventId,
      codeChallenge,
      ticketOwnerPubkey,
      sig,
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
