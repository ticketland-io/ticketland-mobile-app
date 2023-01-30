import React from 'react'
import {View} from 'react-native'
import useStyles from './styles'

const Shadow = props => {
  const {
    style = '',
    styleInner = '',
    children,
    ...rest
  } = props
  const classes = useStyles()

  return (
    <View style={[classes.root, style]} {...rest}>
      <View style={[classes.inner, styleInner]}>
        {children}
      </View>
    </View>
  )
}

export default Shadow
