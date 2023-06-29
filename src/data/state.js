import {WalletCore, constants} from '@ticketland-io/wallet-core-rn'
import SolanaWallet from '@ticketland-io/solana-wallet-rn'
import FirebaseAuth from '@ticketland-io/firebase-auth-rn'
import Config from 'react-native-config'

const Wallet = () => SolanaWallet()
const walletCore = WalletCore({Wallet})
const firebase = FirebaseAuth()

const web3AuthConfig = {
  clientId: Config.WEB3_AUTH_CLIENT_ID,
  network: constants.OPENLOGIN_NETWORK.MAINNET,
  verifier: Config.WEB3_AUTH_VERIFIER,
}

walletCore.init(
  Config.EUTOPIC_API,
  firebase,
  web3AuthConfig,
)

export const initState = {
  web3: null,
  connection: null,
  walletType: 'custody', // custody or injected
  walletCore,
  firebase,
  loading: true,
  user: null,
  mode: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: action.value}
    case 'walletType':
      return {...state, walletType: action.value}
    case 'user':
      return {...state, user: action.value}
    case 'wallet':
      return {...state, wallet: action.value}
    case 'connection':
      return {...state, connection: action.value}
    case 'mode':
      return {...state, mode: action.value}
    default:
      return state
  }
}
