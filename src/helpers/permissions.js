import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions'

export const handleCameraPermission = async () => {
  const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
  const result = await request(permission)

  switch (result) {
    case RESULTS.DENIED:
      return false
    case RESULTS.GRANTED:
      return true
    case RESULTS.BLOCKED:
      await openSettings()
      return false
    default:
      break
  }
}
