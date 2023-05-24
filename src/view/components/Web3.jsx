import React, {useEffect, useContext, useState} from 'react'
import {Dialog, Text} from '@rneui/themed'
import {Context} from '../core/Store'
import {setWeb3} from '../../data/actions'
import useWeb3 from '../hooks/useWeb3'

const Web3 = () => {
  const [, dispatch] = useContext(Context)
  const [open, setOpen] = useState(false)
  const web3 = useWeb3(!open)

  useEffect(() => {
    if (web3 instanceof Error) {
      setOpen(true)
    } else {
      dispatch(setWeb3(web3))
    }
  }, [web3])

  return (
    <Dialog
      isVisible={open}
      onBackdropPress={() => setOpen(false)}
    >
      <Dialog.Title title="Error!" />
      <Text>You need to access openlogin.com to complete login authentication</Text>
    </Dialog>
  )
}

export default React.memo(Web3)
