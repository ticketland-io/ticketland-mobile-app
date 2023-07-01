/**
 * @format
 */

import 'node-libs-react-native/globals.js'
import 'fast-text-encoding'
import {AppRegistry} from 'react-native'
import App from './src/view'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
