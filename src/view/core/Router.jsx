import React from 'react'
import {View} from 'react-native'
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Splash from '../pages/Splash'
import Scanner from '../pages/Scanner'
import Event from '../pages/Event'
import Mode from '../pages/Mode'
import Ticket from '../pages/Ticket'
import useStyles from './styles'

const Router = props => {
  const classes = useStyles()
  const Stack = createNativeStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  return (
    <View style={classes.root}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen name="Mode" component={Mode} />
          <Stack.Screen name="Ticket" component={Ticket} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default Router
