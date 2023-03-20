import {useContext, useEffect} from 'react'
import RNBootSplash from "react-native-bootsplash";
import {Context} from '../../core/Store'

const Splash = ({navigation}) => {
  const [state] = useContext(Context)

  useEffect(() => {
    if (!state.loading && state.user) {
      RNBootSplash.hide({fade: true, duration: 500})
      navigation.replace('Mode')
    } else if (!state.loading) {
      RNBootSplash.hide({fade: true, duration: 500})
      navigation.replace('Login')
    }
  }, [state.loading, state.user])

  return null
}

export default Splash
