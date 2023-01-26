import React from 'react'
import {ThemeProvider} from '@rneui/themed'
import {getTheme} from './theme'
import Router from './Router'
import Auth from '../components/Auth'
import Store from './Store'
import PolyfillCrypto from 'react-native-webview-crypto'
import Init from './Init'

const theme = getTheme()

const App = () => {

  return (
    <Store>
      <PolyfillCrypto />
      <ThemeProvider theme={theme}>
        <Init />
        <Auth />
        <Router />
      </ThemeProvider>
    </Store>
  )
}


export default App
