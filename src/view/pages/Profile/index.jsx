import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, View} from 'react-native'
import {
  Button,
  Icon,
  Image,
  Text,
} from '@rneui/themed'
import {Context} from '../../core/Store'
import {setMode, setWallet} from '../../../data/actions'
import Shadow from '../../components/Shadow'
import useStyles from './styles'
import {formatValue, fromBase} from '../../../helpers/format'
import DeleteAccount from './DeleteAccount'

const Profile = ({navigation}) => {
  const [state, dispatch] = useContext(Context)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [suiBalance, setSuiBalance] = useState(0)
  const classes = useStyles()

  const signOut = async () => {
    try {
      await state.firebase.signOutUser()
      await state.walletCore.logout()

      dispatch(setWallet(null))
    } catch (error) {
      // ignore
    }
  }

  useEffect(() => {
    const run = async () => {
      try {
        const allCoins = await state.wallet.signer.provider.getAllCoins({
          owner: state.wallet?.publicKey.toSuiAddress(),
        })

        const result = allCoins.data.reduce((acc, cur) => ({
          ...acc,
          [cur.coinType.split('::')[2]]: cur.balance,
        }), {})

        setSuiBalance(result.SUI || 0)
        setUsdcBalance(result.USDC || 0)
      } catch (error) {
        console.error('Error loading account balances', error)
      }
    }

    if (state.wallet && state.user) {
      run()
    }
  }, [state.wallet, state.user])

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
              SUI account:
            </Text>
            <Text email style={classes.centeredBold}>
              {state.wallet?.publicKey?.toSuiAddress()}
            </Text>
            <Text email style={classes.label}>
              SUI Balance:
            </Text>
            <Text email style={classes.centeredBold}>
              {formatValue(fromBase(suiBalance))}
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
