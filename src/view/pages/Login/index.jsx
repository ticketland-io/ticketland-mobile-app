import React, {useContext} from 'react'
import {SafeAreaView, Platform} from 'react-native'
import AsyncButton from '../../components/AsyncButton'
import {Context} from '../../core/Store'

const Login = () => {
  const [state, dispatch] = useContext(Context)

  const logIn = provider => async () => {
    try {
      switch (provider) {
        case 'google': {
          await state.firebase.signInWithGoogle()
          break;
        }
        case 'facebook': {
          await state.firebase.signInWithFacebook()
          break;
        }
        default:
          break;
      }
    }
    catch (error) {
      // ignore
    }
  }

  return (
    <SafeAreaView >
      <AsyncButton loading={false} onPress={logIn('facebook')}>
        Login
      </AsyncButton>
    </SafeAreaView>
  )
}


export default Login
