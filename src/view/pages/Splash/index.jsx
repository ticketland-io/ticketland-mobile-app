import {useContext, useEffect} from 'react'
import {Context} from '../../core/Store'

const Splash = ({navigation}) => {
  const [state, _] = useContext(Context)

  useEffect(() => {
    if (!state.loading && state.user) {
      navigation.replace('Home')
    } else if (!state.loading) {
      navigation.replace('Login')
    }
  }, [state.loading, state.user])

  // TODO: add design
  return (null)
}

export default Splash
