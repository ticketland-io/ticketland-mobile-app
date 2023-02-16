import {Platform} from 'react-native'
import EutopicCore from '@ticketland-io/eutopic-core'
import EutopicSolanaWallet from '@ticketland-io/eutopic-solana-wallet-rn'
import FirebaseAuth from '@ticketland-io/eutopic-firebase-auth-rn';
import {VAULT, EUTOPIC_API} from "@env"

const Wallet = () => EutopicSolanaWallet()
const eutopicCore = EutopicCore({Wallet})
const firebase = FirebaseAuth()

eutopicCore.init(
  VAULT,
  EUTOPIC_API,
  firebase
)

export const initState = {
  web3: null,
  connection: null,
  walletType: 'custody', // custody or injected
  eutopicCore,
  firebase,
  loading: true,
  user: null,
  platform: Platform.OS
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: action.value}
    case 'walletType':
      return {...state, walletType: action.value}
    case 'user':
      return {...state, user: action.value}
    case 'web3':
      return {...state, web3: action.value}
    case 'connection':
      return {...state, connection: action.value}
    default:
      return state
  }
}
