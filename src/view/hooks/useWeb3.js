/* eslint-disable no-underscore-dangle */
import {useEffect, useState, useContext} from 'react'
import Web3 from '@apocentre/solana-web3'
import {Context} from '../core/Store'

export default () => {
  const [web3, setWeb3] = useState(null)
  const [state, _] = useContext(Context)

  useEffect(() => {
    const initWeb3 = async () => {
      if (state.connection && state.user?.uid) {
        const _web3 = Web3()

        if (state.walletType === 'custody') {
          const custodyWallet = await state.walletCore.bootstrap(state.user)
          await _web3.init(state.connection, custodyWallet)
        }

        setWeb3(_web3)
      }
    }

    initWeb3().catch(error => console.error('Failed to initialize web3: ', error))
  }, [state.connection, state.user?.uid])

  return web3
}
