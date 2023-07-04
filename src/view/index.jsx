import React from 'react'
import 'react-native-url-polyfill/auto';
import App from './core/App'
import Store from './core/Store'

export default () => (
  <Store>
    <App />
  </Store>
)
