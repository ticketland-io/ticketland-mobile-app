import React, {useContext, useEffect} from 'react'
import {SafeAreaView, View} from 'react-native'
import AntIcon from "react-native-vector-icons/AntDesign";
import {useNavigate, useLocation} from 'react-router-native'
import {Button, Image, Text} from '@rneui/themed'
import {Context} from '../../core/Store'
import Shadow from '../../components/Shadow'
import useStyles from './styles'

const Profile = () => {
  const [state] = useContext(Context)
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const signOut = async () => {
    try {
      await state.firebase.signOutUser()
    } catch (error) {
      //ignore
    }
  }

  const goBack = () => {
    const urlSearchParams = new URLSearchParams(location.search)
    const qs = Object.fromEntries(urlSearchParams.entries())

    qs['redirect-to'] ? navigate(`/${qs['redirect-to']}`) : navigate('/')
  }

  useEffect(() => {
    if (!state.user) {
      navigate('/')
    }
  }, [state.user])

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={classes.container}>
        <View style={classes.firstInnerContainer}>
          <View style={{flex: 2}}>
            <Button
              type={'outline'}
              onPress={goBack}
              buttonStyle={classes.backButton}
            >
              <AntIcon
                name="left"
                size={15}
                style={classes.leftButtonIcon}
              />
            </Button>
          </View>
          <Text h4 style={classes.accountText} >
            My account
          </Text>
          <View style={{flex: 2}} />
        </View>
        <View style={classes.secondInnerContainer}>
          <Shadow alignSelf='center'>
            <Image source={{uri: state.user?.photoURL}} style={classes.userImage} />
          </Shadow>
          <Text h4 style={{textAlign: 'center'}}>
            {state.user?.displayName}
          </Text>
          <Text email style={{textAlign: 'center'}}>
            {state.user?.email}
          </Text>
        </View>
        <View style={classes.thirdInnerContainer}>
          <Button
            type={'outline'}
            buttonStyle={classes.logoutButton}
            onPress={signOut}
          >
            <AntIcon
              name="logout"
              size={16}
              style={classes.logoutIcon}
            />
            <Text h7>
              logout
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default Profile
