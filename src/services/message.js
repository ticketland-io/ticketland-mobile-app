import * as borsh from 'borsh'
import * as bs58 from 'bs58'
import {Platform} from 'react-native'

// TODO: move all this logic to the online ticket verification app
class VerifyTicketMsg {
  constructor(eventId, codeChallenge, ticketMetadata) {
    this.eventId = eventId
    this.codeChallenge = codeChallenge
    this.ticketMetadata = ticketMetadata
  }
}

const VerifyTicketMsgType = {
  "kind": "struct",
  "fields": [
    ['eventId', 'string'],
    ['codeChallenge', 'string'],
    ['ticketMetadata', 'string'],
  ]
}

export const getSignedMessage = async (web3, eventId, codeChallenge, ticketMetadata) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, ticketMetadata)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]]);

  let message = borsh.serialize(schema, msg)

  if (Platform.OS === 'android') {
    message = Buffer.from(borsh.serialize(schema, msg))
  }

  const sig = await web3.anchorProvider.wallet.signMessage(message)

  return bs58.encode(sig)
}
