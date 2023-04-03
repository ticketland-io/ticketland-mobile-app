import {makeStyles} from '@rneui/themed'
import {Dimensions} from 'react-native'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const overlayColor = 'rgba(0,0,0,0.5)';
const rectDimensionsHeight = SCREEN_HEIGHT * 0.45; // this is equivalent to 255 from a 393 device width
const rectDimensions = SCREEN_WIDTH * 0.8; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width

export default makeStyles(theme => {
  const markerBorderColor = (scanned, error) => {
    switch (true) {
      case !scanned:
        return theme.palette.common.gray96
      case error:
        return theme.palette.common.error
      default:
        return theme.palette.common.yellow500
    }
  }

  return {
    markerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    dialog: {
      position: 'absolute',
      width: '90%',
      bottom: 50,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: 'yellow',
      padding: 24
    },
    errorIconItem: {
      flex: 2,
      justifyContent: 'center'
    },
    dialogTextItem: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    markerHeader: {
      flex: 1,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
      justifyContent: 'center',
      alignItems: 'center'
    },
    markerHeaderSubText: {
      color: theme.palette.common.white,
      marginTop: 24
    },
    markerLeftOuterSide: {
      height: rectDimensionsHeight,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor
    },
    markerCenter: (scanned, error) => ({
      height: rectDimensionsHeight,
      width: rectDimensions,
      borderWidth: rectBorderWidth,
      borderColor: markerBorderColor(scanned, error),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent"
    }),
    markerRightOuterSide: {
      height: rectDimensionsHeight,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor
    },
    buttonContainer: {
      flex: 1,
      height: SCREEN_WIDTH,
      width: SCREEN_WIDTH,
      backgroundColor: overlayColor,
      justifyContent: 'flex-end',
      alignItems: "center"
    },
    cancelButton: {
      marginBottom: SCREEN_WIDTH * 0.15,
      backgroundColor: theme.palette.common.gray100,
      padding: 12
    },
    dialogButton: {
      backgroundColor: theme.palette.common.gray800,
      marginTop: 24
    },
    cancelButtonContainerStyle: {
      width: rectDimensions
    }
  }
})
