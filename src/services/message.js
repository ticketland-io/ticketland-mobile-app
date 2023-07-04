import * as borsh from 'borsh'

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

export const getSignedMessage = async (wallet, eventId, codeChallenge, cntSuiAddress) => {
  const msg = new VerifyTicketMsg(eventId, codeChallenge, cntSuiAddress)
  const schema = new Map([[VerifyTicketMsg, VerifyTicketMsgType]])
  const message = borsh.serialize(schema, msg)
  const signature = (await wallet.signMessage(message))

  return Buffer.from(signature).toString('hex')
}
