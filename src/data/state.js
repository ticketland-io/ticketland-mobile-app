import EutopicCore from '@ticketland-io/eutopic-core'
import EutopicSolanaWallet from '@ticketland-io/eutopic-solana-wallet'
import Enclave from '@ticketland-io/eutopic-web-enclave'
import FirebaseAuth from '@ticketland-io/eutopic-firebase-auth-rn';

const Wallet = () => EutopicSolanaWallet({enclave: Enclave()})
const firebase = FirebaseAuth()
const eutopicCore = EutopicCore({Wallet})

eutopicCore.init(
  process.env.VAULT,
  process.env.EUTOPIC_API,
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
    case 'ws':
      return {...state, ws: action.value}
    default:
      return state
  }
}
