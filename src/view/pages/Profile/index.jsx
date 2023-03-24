import React, {useContext, useEffect} from 'react'
import {SafeAreaView, View} from 'react-native'
import AntIcon from "react-native-vector-icons/AntDesign";
import {Button, Image, Text} from '@rneui/themed'
import {Context} from '../../core/Store'
import {setMode, setWeb3} from '../../../data/actions';
import Shadow from '../../components/Shadow'
import useStyles from './styles'

const Profile = ({navigation}) => {
  const [state, dispatch] = useContext(Context)
  const classes = useStyles()

  const signOut = async () => {
    try {
      await state.firebase.signOutUser()
      dispatch(setWeb3(null))
    } catch (error) {
      //ignore
    }
  }

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
              type={'outline'}
              onPress={navigation.goBack}
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
          <View style={{marginBottom: 24}}>
            <Shadow alignSelf='center' >
              <Image source={{uri: state.user?.photoURL}} style={classes.userImage} />
            </Shadow>
          </View>
          <Text h4 style={classes.displayName}>
            {state.user?.displayName}
          </Text>
          <Text email style={{textAlign: 'center'}}>
            {state.user?.email}
          </Text>
        </View>
        <View style={classes.thirdInnerContainer}>
          <Button
            type={'outline'}
            containerStyle={{marginBottom: 12}}
            buttonStyle={classes.modeButton}
            onPress={goToMode}
          >
            <Text h7>
              Mode: {state.mode}
            </Text>
          </Button>
          <Button
            type={'outline'}
            buttonStyle={[classes.logoutButton]}
            onPress={signOut}
          >
            <AntIcon
              name="logout"
              size={16}
              style={[classes.logoutIcon, {color: 'white'}]}
            />
            <Text h7 style={{color: 'white'}}>
              Logout
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default Profile
