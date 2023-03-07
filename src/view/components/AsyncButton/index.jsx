import React from 'react'
import {Button} from '@rneui/base'
import {Link} from '@react-navigation/native';
import styles from './styles'

const AsyncButton = props => {
  const {
    children,
    loading,
    buttonStyle,
    variant,
    onClick,
    disabled,
    fullWidth,
    color,
    path,
    size,
    type,
    ...rest
  } = props

  const classes = styles()
  return (
    <Button
      disableElevation
      variant={variant}
      size={size}
      disabled={loading || disabled}
      loading={loading}
      onClick={onClick}
      type={type}
      buttonStyle={buttonStyle}
      fullWidth={fullWidth}
      color={color}
      component={path ? Link : undefined}
      to={path}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default React.memo(AsyncButton)
