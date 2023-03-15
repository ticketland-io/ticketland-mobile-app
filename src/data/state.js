import EutopicCore from '@ticketland-io/eutopic-core'
import EutopicSolanaWallet from '@ticketland-io/eutopic-solana-wallet-rn'
import FirebaseAuth from '@ticketland-io/eutopic-firebase-auth-rn';
import Config from 'react-native-config';

const Wallet = () => EutopicSolanaWallet()
const eutopicCore = EutopicCore({Wallet})
const firebase = FirebaseAuth()

eutopicCore.init(
  Config.VAULT,
  Config.EUTOPIC_API,
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
  mode: null
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
    case 'mode':
      return {...state, mode: action.value}
    default:
      return state
  }
}
