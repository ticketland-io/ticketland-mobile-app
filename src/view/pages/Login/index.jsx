import React, {useContext} from 'react'
import {SafeAreaView, View, ImageBackground} from 'react-native'
import {Button, Image, Text, Divider} from '@rneui/themed'
import {useNavigate} from 'react-router-native'
import {Context} from '../../core/Store'
import {capitalizeFirstLetter} from '../../../helpers/string'
import Shadow from '../../components/Shadow'
import FacebookIcon from '../../../assets/facebookIcon.png';
import GoogleIcon from '../../../assets/googleIcon.png';
import Circle from '../../../assets/circle.png';
import useStyles from './styles'

const Login = () => {
  const [state, _] = useContext(Context)
  const classes = useStyles()
  const navigate = useNavigate()

  const providerImages = {
    google: GoogleIcon,
    facebook: FacebookIcon
  }

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

      navigate('/home')
    }
    catch (error) {
      // ignore
    }
  }

  const renderProviderButtons = provider => (
    <Button
      onPress={logIn(provider)}
      type='clear'
    >
      <View style={{flex: 3}} >
        <Image
          source={providerImages[provider]}
          style={classes.providerImage}
        />
      </View>
      <View style={{flex: 9}}>
        <Text h4>{capitalizeFirstLetter(provider)}</Text>
      </View>
    </Button>
  )

  return (
    <ImageBackground source={Circle} resizeMode="cover" style={classes.background}>
      <SafeAreaView style={classes.safeAreaView}>
        <Text alignSelf='center' style={{marginBottom: 16}}>
          <Text h1Bold>WELCOME </Text>
          <Text h1>BACK!</Text>
        </Text>
        <Text h6 alignSelf='center' style={classes.secondaryText}>
          Ticketland is a ticketing and invitation cards platform and infrastructure powered by blockchain and NFT technologies.
        </Text>
        <Shadow alignSelf='center' style={classes.shadow}>
          <View justifyContent='center'>
            <View style={{marginBottom: 24}}>
              <Text alignSelf='center' style={{marginBottom: 24}}>
                <Text h6>
                  {`Sign in with `}
                </Text>
                <Text h6Bold>
                  social media
                </Text>
              </Text>
              <Divider />
            </View>
            {renderProviderButtons('facebook')}
            {renderProviderButtons('google')}
          </View>
        </Shadow>
      </SafeAreaView >
    </ImageBackground>
  )
}


export default Login
