import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, View} from 'react-native'
import {
  Button,
  Icon,
  Image,
  Text,
} from '@rneui/themed'
import {Context} from '../../core/Store'
import {setMode, setWeb3} from '../../../data/actions'
import Shadow from '../../components/Shadow'
import useStyles from './styles'
import {formatValue} from '../../../helpers/format'
import {currencies} from '../../../helpers/constants'
import DeleteAccount from './DeleteAccount'

const Profile = ({navigation}) => {
  const [state, dispatch] = useContext(Context)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [solBalance, setSolBalance] = useState(0)
  const classes = useStyles()

  const signOut = async () => {
    try {
      await state.firebase.signOutUser()
      await state.walletCore.logout()

      dispatch(setWeb3(null))
    } catch (error) {
      // ignore
    }
  }

  useEffect(() => {
    const run = async () => {
      try {
        const usdcAta = await state.web3.getAssociatedTokenAddress(
          currencies.USDC,
          state.web3.wallet.publicKey,
          true,
        )
        const {value: {amount}} = await state.web3.getTokenAccountBalance(usdcAta)

        setUsdcBalance(amount)
        setSolBalance(await state.web3.getBalance(state.web3.wallet.publicKey))
      } catch (error) {
        console.error('Error loading account balances', error)
      }
    }

    if (state.web3 && state.web3.wallet && state.user) {
      run()
    }
  }, [state.web3, state.user])

  useEffect(() => {
    if (!state.user) {
      dispatch(setMode(null))
      navigation.reset({index: 1, routes: [{name: 'Login'}]})
    }
  }, [state.user])

  const goToMode = () => {
    dispatch(setMode(null))
    navigation.reset({index: 1, routes: [{name: 'Mode'}]})
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={classes.container}>
        <View style={classes.firstInnerContainer}>
          <View style={{flex: 2}}>
            <Button
              type='outline'
              onPress={navigation.goBack}
              buttonStyle={classes.backButton}
            >
              <Icon
                type='ant-design'
                name='left'
                size={15}
                style={classes.leftButtonIcon}
              />
            </Button>
          </View>
          <Text h4 style={classes.accountText}>
            My account
          </Text>
          <View style={{flex: 2}} />
        </View>
        <View style={classes.secondInnerContainer}>
          <View style={{marginBottom: 24}}>
            <Shadow alignSelf='center'>
              <Image source={{uri: state.user?.photoURL}} style={classes.userImage} />
            </Shadow>
          </View>
          <Text h4 style={classes.centeredBold}>
            {state.user?.displayName}
          </Text>
          <Text email style={classes.label}>
            {state.user?.email}
          </Text>
          <View style={classes.infoContainer}>
            <Text email style={classes.label}>
              SOL account:
            </Text>
            <Text email style={classes.centeredBold}>
              {state.web3?.wallet?.publicKey.toBase58()}
            </Text>
            <Text email style={classes.label}>
              SOL Balance:
            </Text>
            <Text email style={classes.centeredBold}>
              {formatValue(state.web3?.fromBase(solBalance))}
            </Text>
            <Text email style={classes.label}>
              USDC Balance:
            </Text>
            <Text email style={classes.centeredBold}>
              {formatValue(state.web3?.fromBase(usdcBalance, 6))}
            </Text>
          </View>
        </View>
        <View style={classes.thirdInnerContainer}>
          <Button
            type='outline'
            containerStyle={{marginBottom: 12}}
            buttonStyle={classes.modeButton}
            onPress={goToMode}
          >
            <Text h7>
              Mode: {state.mode}
            </Text>
          </Button>
          <Button
            type='outline'
            containerStyle={{marginBottom: 12}}
            buttonStyle={[classes.logoutButton]}
            onPress={signOut}
          >
            <Icon
              type='ant-design'
              name='logout'
              size={16}
              color='white'
              style={classes.logoutIcon}
            />
            <Text h7 style={{color: 'white'}}>
              Logout
            </Text>
          </Button>
          <DeleteAccount />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile
