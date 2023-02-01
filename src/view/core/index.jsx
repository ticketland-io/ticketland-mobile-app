import React from 'react'
import {getTheme} from './theme'
import Store from './Store'
import Core from './Core'

const theme = getTheme()

const App = () => {

  return (
    <Store>
      <Core />
    </Store>
  )
}


export default App
