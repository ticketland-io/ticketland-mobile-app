import React from 'react'
import {View} from 'react-native'
import {Text} from '@rneui/themed'
import {capitalizeFirstLetter} from '../../../helpers/format';
import useStyles from './styles'

const SectionTitle = props => {
  const {
    title = '',
    secondaryTitle = 'events',
    style = '',
    innerStyle = ''
  } = props
  const classes = useStyles()

  return (
    <View style={[classes.root, style]}>
      <View style={[classes.innerRoot, innerStyle]}>
        <Text title>{capitalizeFirstLetter(title)} </Text>
        <Text title style={classes.eventsText}>{secondaryTitle}</Text>
      </View>
    </View>
  );
};

export default SectionTitle
