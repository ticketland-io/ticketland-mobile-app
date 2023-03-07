import {useContext, useEffect} from 'react'
import RNBootSplash from "react-native-bootsplash";
import {Context} from '../../core/Store'

const Splash = ({navigation}) => {
  const [state] = useContext(Context)

  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500})

    if (!state.loading && state.user) {
      navigation.replace('Mode')
    } else if (!state.loading) {
      navigation.replace('Login')
    }
  }, [state.loading, state.user])

  return null
}

export default Splash
