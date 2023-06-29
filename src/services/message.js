import * as borsh from 'borsh'
import * as bs58 from 'bs58'

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

export const getSignedMessage = async (signer, eventId, codeChallenge, ticketMetadata) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, ticketMetadata)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]])
  const message = borsh.serialize(schema, msg)
  const {signature} = (await signer.signMessage({message}))

  return bs58.encode(Buffer.from(signature))
}
