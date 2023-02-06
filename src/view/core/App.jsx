import React, {useContext, useEffect} from 'react'
import {ThemeProvider} from '@rneui/themed'
import {CLUSTER_ENDPOINT} from "@env"
import {Context} from './Store'
import Router from './Router'
import Auth from '../components/Auth'
import useConnection from '../hooks/useConnection'
import {setConnection, setWeb3} from '../../data/actions'
import useWeb3 from '../hooks/useWeb3'
import {getTheme} from './theme'

const theme = getTheme()

const App = () => {
  const [, dispatch] = useContext(Context)
  const web3 = useWeb3()
  const connection = useConnection(CLUSTER_ENDPOINT)

  useEffect(() => {
    dispatch(setWeb3(web3))
    dispatch(setConnection(connection))
  }, [connection, web3])

  return (
    <ThemeProvider theme={theme}>
      <Auth />
      <Router />
    </ThemeProvider>
  )
}

export default App
