import React, {useContext, useEffect} from 'react'
import {ThemeProvider} from '@rneui/themed'
import Config from 'react-native-config'
import {setConnection} from '../../data/actions'
import useConnection from '../hooks/useConnection'
import Auth from '../components/Auth'
import Web3Auth from '../components/Web3Auth'
import {Context} from './Store'
import Router from './Router'
import {getTheme} from './theme'

const theme = getTheme()

const App = () => {
  const [, dispatch] = useContext(Context)
  const connection = useConnection(Config.CLUSTER_ENDPOINT)

  useEffect(() => {
    dispatch(setConnection(connection))
  }, [connection])

  return (
    <ThemeProvider theme={theme}>
      <Web3Auth />
      <Auth />
      <Router />
    </ThemeProvider>
  )
}

export default App
