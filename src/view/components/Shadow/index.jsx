import React, {useContext} from 'react'
import {View} from 'react-native'
import {Shadow as ShadowComp} from 'react-native-shadow-2'
import {Context} from '../../core/Store'
import useStyles from './styles'

const Shadow = props => {
  const {
    style = '',
    styleInner = '',
    children,
    ...rest
  } = props
  const [state] = useContext(Context)
  const classes = useStyles()

  const isDisabled = () => state.platform !== 'android' || style.shadowOpacity === 0

  return isDisabled()
    ? (
      <View style={[classes.root, style]} {...rest}>
        <View style={[classes.inner, styleInner]}>
          {children}
        </View>
      </View>
    )
    : (
      <View {...rest}>
        <ShadowComp style={classes.androidShadow} distance={2} disabled={isDisabled()} startColor={classes.androidShadow.shadowColor} offset={[5, 10]}>
          <View style={[classes.root, style]}>
            <View style={[classes.inner, styleInner]}>
              {children}
            </View>
          </View>
        </ShadowComp>
      </View>
    )
}

export default Shadow
