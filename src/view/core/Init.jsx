import React, {useContext, useEffect} from 'react'
import {ThemeProvider} from '@rneui/themed'
import {getTheme} from './theme'
import useConnection from '../hooks/useConnection'
import {Context} from './Store'
import {setConnection, setWeb3} from '../../data/actions'
import useWeb3 from '../hooks/useWeb3'

const theme = getTheme()

const Init = () => {
  const [, dispatch] = useContext(Context)
  const web3 = useWeb3()
  const connection = useConnection(process.env.CLUSTER_ENDPOINT)
  
  useEffect(() => {
    dispatch(setWeb3(web3))
    dispatch(setConnection(connection))
  }, [connection])

  return null
}


export default Init
