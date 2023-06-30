import * as borsh from 'borsh'
import * as bs58 from 'bs58'

class VerifyTicketMsg {
  constructor(eventId, codeChallenge, cntSuiAddress) {
    this.eventId = eventId
    this.codeChallenge = codeChallenge
    this.cntSuiAddress = cntSuiAddress
  }
}

const VerifyTicketMsgType = {
  kind: 'struct',
  fields: [
    ['eventId', 'string'],
    ['codeChallenge', 'string'],
    ['cntSuiAddress', 'string'],
  ],
}

export const getSignedMessage = async (signer, eventId, codeChallenge, cntSuiAddress) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, cntSuiAddress)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]])
  const message = borsh.serialize(schema, msg)
  const {signature} = (await signer.signMessage({message}))

  return bs58.encode(Buffer.from(signature))
}
