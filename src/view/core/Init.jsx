import React, {useContext, useEffect} from 'react'
import {ThemeProvider} from '@rneui/themed'
import {getTheme} from './theme'
import Router from './Router'
import Auth from '../components/Auth'
import Store from './Store'
import PolyfillCrypto from 'react-native-webview-crypto'
import useConnection from '../hooks/useConnection'
import {Context} from './Store'
import {setConnection, setWeb3, setWs} from '../../data/actions'
import useWeb3 from '../hooks/useWeb3'
import useWs from '../hooks/useWs'

const theme = getTheme()

const Init = () => {
  const [state, dispatch] = useContext(Context)
  const web3 = useWeb3()
  const connection = useConnection(process.env.CLUSTER_ENDPOINT)
  const ws = useWs()
  
  useEffect(() => {
    dispatch(setWeb3(web3))
    dispatch(setConnection(connection))
    dispatch(setWs(ws))
  }, [connection])

  return null
}


export default Init
