import Config from 'react-native-config'
import * as anchor from '@project-serum/anchor'

const {PublicKey} = anchor.web3

export const qrCodeKeys = [
  'ticketMetadata',
  'ticketNft',
  'codeChallenge',
  'ticketOwnerPubkey',
  'sig',
  'eventId',
  'expTimestamp',
]

export const currencies = {
  WRAPPED_SOL: new PublicKey('So11111111111111111111111111111111111111112'),
  USDC: new PublicKey(Config.USDC),
}
