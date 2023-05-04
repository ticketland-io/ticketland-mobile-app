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

export const ASPECT_RATIOS = {
  '3:1': {
    ratio: 3 / 1,
    width: 360,
    height: 120,
  },
  '2:1': {
    ratio: 2 / 1,
    width: 360,
    height: 180,
  },
  '5:3': {
    ratio: 5 / 3,
    width: 360,
    height: 216,
  },
  '16:9': {
    ratio: 16 / 9,
    width: 360,
    height: 202.5,
  },
}
