import React, {useContext, useState} from 'react'
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator
} from 'react-native'
import {Button, Image, Text, Divider, Icon} from '@rneui/themed'
import {Context} from '../../core/Store'
import {capitalizeFirstLetter} from '../../../helpers/string'
import Shadow from '../../components/Shadow'
import FacebookIcon from '../../../assets/facebookIcon.png';
import GoogleIcon from '../../../assets/googleIcon.png';
import TwitterIcon from '../../../assets/twitterIcon.png';
import AppleIcon from '../../../assets/appleIcon.png';
import Circle from '../../../assets/circle.png';
import useStyles from './styles'

const Login = ({navigation}) => {
  const [state, _] = useContext(Context)
  const [modalVisible, setModalVisible] = useState(false)
  const [registeredProvider, setRegisteredProvider] = useState('')
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const providerImages = {
    google: GoogleIcon,
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    apple: AppleIcon
  }

  const logIn = provider => async () => {
    setLoading(true)

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
        case 'twitter': {
          await state.firebase.signInWithTwitter()
          break;
        }
        case 'apple': {
          await state.firebase.signInWithAppleId()
          break;
        }
        default:
          break;
      }
      navigation.replace('Mode')
    }
    catch (error) {
      if (error.message === 'User already singed up with a different provider') {
        setRegisteredProvider(error.data.provider)
        setModalVisible(true)
      }
    }

    setLoading(false)
  }

  const renderProviderButtons = provider => (
    <Button
      onPress={logIn(provider)}
      type='clear'
      TouchableComponent={TouchableOpacity}
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

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {setModalVisible(!modalVisible)}}
    >
      <View style={classes.modalViewContainer}>
        <View style={classes.modalViewItem}>
          <View style={{alignSelf: 'flex-end'}}>
            <Button type='clear' onPress={() => {setModalVisible(false)}}>
              <Icon
                type="ant-design"
                name="close"
                size={20}
              />
            </Button>
          </View>
          <View style={classes.modalTextContainer}>
            <Icon
              type="ant-design"
              name="warning"
              color={'#E24A30'}
              style={classes.warningIcon}
              size={50}
            />
            <Text style={classes.modalText} h6>Email already registered with different provider</Text>
            <Text style={classes.modalText} h6>({registeredProvider})</Text>
          </View>
        </View>
      </View>
    </Modal>
  )

  return (
    <ImageBackground source={Circle} resizeMode="cover" style={classes.background}>
      <SafeAreaView style={classes.safeAreaView}>
        {renderModal()}
        <Text alignSelf='center' style={{marginBottom: 16}}>
          <Text h1Bold>WELCOME </Text>
          <Text h1>BACK!</Text>
        </Text>
        <Text h6 alignSelf='center' style={classes.secondaryText}>
          Ticketland is a ticketing and invitation cards platform and infrastructure powered by blockchain and NFT technologies.
        </Text>
        <View style={classes.shadowContainer}>
          <Shadow style={classes.shadow(loading)}>
            <View justifyContent='center' >
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
              {loading && <View style={{position: 'absolute', zIndex: 1, alignSelf: 'center'}}>
                <ActivityIndicator size="large" />
              </View>}
              {renderProviderButtons('facebook')}
              {renderProviderButtons('google')}
              {renderProviderButtons('twitter')}
              {Platform.OS === 'ios' && renderProviderButtons('apple')}
            </View>
          </Shadow>
        </View>
      </SafeAreaView >
    </ImageBackground>
  )
}


export default Login
