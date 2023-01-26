import React, {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-native'
import {Context} from '../../core/Store'

const Splash = () => {
  const [state, _] = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.user != null && Object.keys(state.user).length != 0) {
      navigate('/home')
    } else if (state.user != null && Object.keys(state.user).length === 0) {
      navigate('/login')
    }
  }, [state.user])

  // TODO: add design
  return (null)
}

export default Splash
