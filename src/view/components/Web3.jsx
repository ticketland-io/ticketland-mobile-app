import React, {useEffect, useContext, useState} from 'react'
import {Button, Dialog, Text} from '@rneui/themed'
import {Context} from '../core/Store'
import {setWeb3} from '../../data/actions'
import useWeb3 from '../hooks/useWeb3'

const Web3 = () => {
  const [, dispatch] = useContext(Context)
  const [openDialog, setOpenDialog] = useState(true)
  const web3 = useWeb3(!openDialog)
  const classes = useStyles()

  useEffect(() => {
    if (web3 instanceof Error) {
      setOpenDialog(true)
    } else {
      dispatch(setWeb3(web3))
    }
  }, [web3])

  return (
    <Dialog
      isVisible={openDialog}
      onBackdropPress={() => setOpenDialog(false)}
    >
      <Text>You need to access openlogin.com to complete login authentication</Text>
      <Button
        buttonStyle={classes.dialogButton}
        onPress={() => setOpenDialog(false)}
      >
        <Text style={{color: 'white'}}>
          Access openlogin.com
        </Text>
      </Button>
    </Dialog>
  )
}

export default React.memo(Web3)
