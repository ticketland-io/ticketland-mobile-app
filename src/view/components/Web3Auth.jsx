import React, {useEffect, useContext, useState} from 'react'
import {Button, Dialog, Text} from '@rneui/themed'
import Web3 from '@apocentre/solana-web3'
import {Context} from '../core/Store'
import {setWeb3} from '../../data/actions'
import useStyles from './styles'

const Web3Auth = () => {
  const [state, dispatch] = useContext(Context)
  const [openDialog, setOpenDialog] = useState(false)
  const [initWeb3State, setInitWeb3State] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    if (state.connection && state.user?.uid) {
      setOpenDialog(true)
    }
  }, [state.connection, state.user?.uid])

  useEffect(() => {
    const initWeb3 = async () => {
      if (state.connection && state.user?.uid && initWeb3State) {
        const _web3 = Web3()

        if (state.walletType === 'custody') {
          const custodyWallet = await state.walletCore.bootstrap(state.user)
          await _web3.init(state.connection, custodyWallet)
        }

        dispatch(setWeb3(_web3))
        setInitWeb3State(false)
      }
    }

    initWeb3().catch(error => {
      setInitWeb3State(false)
      setOpenDialog(true)
      console.error('Failed to initialize web3: ', error)
    })
  }, [state.connection, state.user?.uid, initWeb3State])

  return (
    <Dialog isVisible={openDialog}>
      <Text>You need to access openlogin.com to complete login authentication</Text>
      <Button
        buttonStyle={classes.dialogButton}
        onPress={() => {
          setInitWeb3State(true)
          setOpenDialog(false)
        }}
      >
        <Text style={{color: 'white'}}>
          Access openlogin.com
        </Text>
      </Button>
    </Dialog>
  )
}

export default React.memo(Web3Auth)
