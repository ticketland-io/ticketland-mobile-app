import React, {useContext, useEffect} from 'react'
import {ImageBackground, SafeAreaView, View} from 'react-native'
import {Button, Divider, Text} from '@rneui/themed'
import RNBootSplash from 'react-native-bootsplash'
import {Context} from '../../core/Store'
import Circle from '../../../assets/circle.png'
import {setMode} from '../../../data/actions'
import Shadow from '../../components/Shadow'
import useStyles from './styles'

const Mode = ({navigation}) => {
  const [state, dispatch] = useContext(Context)
  const classes = useStyles()

  useEffect(() => {
    if (!state.loading && state.user && state.mode) {
      RNBootSplash.hide({fade: true, duration: 500})
      navigation.replace('Home')
    }
  }, [state.loading, state.user, state.mode])

  const setAppMode = mode => () => {
    dispatch(setMode(mode))
  }

  return (
    <ImageBackground source={Circle} resizeMode='cover' style={classes.background}>
      <SafeAreaView style={classes.safeAreaView}>
        <Text alignSelf='center' style={{marginBottom: 16}}>
          <Text h1Bold>WELCOME </Text>
          <Text h1>BACK!</Text>
        </Text>
        <Text h6 alignSelf='center' style={classes.secondaryText}>
          With our app, you can enjoy seamless access to your tickets in user mode,
          while organizer mode allows event hosts to quickly and easily verify tickets.
        </Text>
        <View style={classes.shadow}>
          <Shadow style={{padding: 24}}>
            <View justifyContent='center'>
              <Text h6 alignSelf='center' style={{marginBottom: 14}}>
                Choose mode
              </Text>
              <Divider style={{marginBottom: 14}} />
              <Button
                containerStyle={classes.userButtonContainer}
                buttonStyle={classes.buttonStyle}
                onPress={setAppMode('user')}
              >
                User
              </Button>
              <Button
                containerStyle={classes.organizerButtonContainer}
                buttonStyle={classes.buttonStyle}
                onPress={setAppMode('organizer')}
              >
                Organizer
              </Button>
            </View>
          </Shadow>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Mode
