import ReactNativeBlobUtil from 'react-native-blob-util'
import Share from 'react-native-share'
import RNFS from 'react-native-fs'

export const sharePdf = (eventId, ticketImage) => {
  let filePath = null

  const configOptions = {
    mimeType: 'application/pdf',
    fileCache: true,
    path: ReactNativeBlobUtil.fs.dirs.DocumentDir + (`/${eventId}.pdf`)
  }

  ReactNativeBlobUtil.config(configOptions)
    .fetch('GET', ticketImage?.url)
    .then(async resp => {
      filePath = resp.path()
      const options = {
        type: 'application/pdf',
        url: Platform.OS === 'ios' ? filePath : `file://${filePath}`
      }

      await Share.open(options)
      // remove the pdf from device's storage
      await RNFS.unlink(filePath)
    })
}
