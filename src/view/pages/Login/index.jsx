import React, {useContext, useState} from 'react'
import {
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  Modal
} from 'react-native'
import {Button, Image, Text, Divider} from '@rneui/themed'
import AntIcon from "react-native-vector-icons/AntDesign";
import {Context} from '../../core/Store'
import {capitalizeFirstLetter} from '../../../helpers/string'
import Shadow from '../../components/Shadow'
import FacebookIcon from '../../../assets/facebookIcon.png';
import GoogleIcon from '../../../assets/googleIcon.png';
import TwitterIcon from '../../../assets/twitterIcon.png';
import Circle from '../../../assets/circle.png';
import useStyles from './styles'

const Login = ({navigation}) => {
  const [state, _] = useContext(Context)
  const [modalVisible, setModalVisible] = useState(false)
  const [registeredProvider, setRegisteredProvider] = useState('')
  const classes = useStyles()

  const providerImages = {
    google: GoogleIcon,
    facebook: FacebookIcon,
    twitter: TwitterIcon
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
        case 'twitter': {
          await state.firebase.signInWithTwitter()
          break;
        }
        default:
          break;
      }

      navigation.replace('Mode')
    }
    catch (error) {
      if (error.error.message === 'User already singed up with another provider') {
        setRegisteredProvider(error.provider)
        setModalVisible(true)
      }
    }
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
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={classes.modalViewContainer}>
        <View style={classes.modalViewItem}>
          <View style={{alignSelf: 'flex-end'}}>
            <Button type='clear' onPress={() => {setModalVisible(false)}}>
              <AntIcon
                name="close"
                size={20}
              />
            </Button>
          </View>
          <View style={classes.modalTextContainer}>
            <AntIcon
              name="warning"
              color={'#E24A30'}
              style={classes.warningIcon}
              size={50}
            />
            <Text style={classes.modalText} h6>User already registered with different provider</Text>
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
        <View style={classes.shadow}>
          <Shadow style={{padding: 24}}>
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
              {renderProviderButtons('twitter')}
            </View>
          </Shadow>
        </View>
      </SafeAreaView >
    </ImageBackground>
  )
}


export default Login
