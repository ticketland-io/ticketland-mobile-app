import {useContext, useEffect} from 'react'
import RNBootSplash from "react-native-bootsplash";
import {Context} from '../../core/Store'
import Circle from '../../../assets/circle.png';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import useStyles from './styles'
import {Button, Divider, Text} from '@rneui/themed';
import Shadow from '../../components/Shadow';
import {setMode} from '../../../data/actions';

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

  // TODO: add design
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
                User mode
              </Button>
              <Button
                containerStyle={classes.organizerButtonContainer}
                buttonStyle={classes.buttonStyle}
                onPress={setAppMode('organizer')}
              >
                Organizer mode
              </Button>
            </View>
          </Shadow>
        </View>
      </SafeAreaView >
    </ImageBackground>

  )
}

export default Mode
