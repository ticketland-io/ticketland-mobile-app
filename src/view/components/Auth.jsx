import React, {useEffect, useContext} from 'react'
import {Context} from '../core/Store'
import {setUser, setLoading} from '../../data/actions'

const Auth = () => {
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    state.firebase.onUserChanged(async currentUser => {
      dispatch(setUser(currentUser))
      dispatch(setLoading(false))
    })
  }, [])

  return null
}

export default React.memo(Auth)
