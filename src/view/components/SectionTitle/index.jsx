import React from 'react'
import {View} from 'react-native'
import {Text} from '@rneui/themed'
import {capitalizeFirstLetter} from '../../../helpers/format';
import useStyles from './styles'

const SectionTitle = props => {
  const {
    title = '',
    secondaryTitle = 'events',
    style = ''
  } = props
  const classes = useStyles()

  return (
    <View style={[classes.root, style]}>
      <Text title>{capitalizeFirstLetter(title)} </Text>
      <Text title style={classes.eventsText}>{secondaryTitle}</Text>
    </View>
  );
};

export default SectionTitle
