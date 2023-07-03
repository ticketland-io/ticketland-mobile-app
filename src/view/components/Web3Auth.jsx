import React, {useEffect, useContext, useState} from 'react'
import {Button, Dialog, Text} from '@rneui/themed'
import Config from 'react-native-config'
import {Context} from '../core/Store'
import {setWallet} from '../../data/actions'
import useStyles from './styles'

const Web3Auth = () => {
  const [state, dispatch] = useContext(Context)
  const [openDialog, setOpenDialog] = useState(false)
  const [initWalletState, setInitWalletState] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    if (state.connection && state.user?.uid) {
      setInitWalletState(true)
    }
  }, [state.connection, state.user?.uid])

  useEffect(() => {
    const initWallet = async () => {
      if (state.connection && state.user?.uid && initWalletState) {
        let custodyWallet

        if (state.walletType === 'custody') {
          custodyWallet = await state.walletCore.bootstrap(Config.CLUSTER_ENDPOINT)
        }

        dispatch(setWallet(custodyWallet))
        setInitWalletState(false)
      }
    }

    initWallet().catch(error => {
      setInitWalletState(false)
      setOpenDialog(true)
      console.error('Failed to initialize web3: ', error)
    })
  }, [state.connection, state.user?.uid, initWalletState])

  return (
    <Dialog isVisible={openDialog}>
      <Text>You need to access openlogin.com to complete login authentication</Text>
      <Button
        buttonStyle={classes.dialogButton}
        onPress={() => {
          setInitWalletState(true)
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
