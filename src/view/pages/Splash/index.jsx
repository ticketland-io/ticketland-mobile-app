import {useContext, useEffect} from 'react'
import RNBootSplash from "react-native-bootsplash";
import {Context} from '../../core/Store'

const Splash = ({navigation}) => {
  const [state, _] = useContext(Context)

  useEffect(() => {
    if (!state.loading && state.user) {
      RNBootSplash.hide({fade: true, duration: 500})
      navigation.replace('Home')
    } else if (!state.loading) {
      RNBootSplash.hide({fade: true, duration: 500})
      navigation.replace('Login')
    }
  }, [state.loading, state.user])

  // TODO: add design
  return (null)
}

export default Splash
