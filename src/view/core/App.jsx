import React from 'react'
import {ThemeProvider} from '@rneui/themed'
import {getTheme} from './theme'
import Router from './Router'
import Auth from '../components/Auth'
import Store from './Store'
import Init from './Init'

const theme = getTheme()

const App = () => {

  return (
    <Store>
      <ThemeProvider theme={theme}>
        <Init />
        <Auth />
        <Router />
      </ThemeProvider>
    </Store>
  )
}


export default App
