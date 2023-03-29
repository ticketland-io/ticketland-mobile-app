import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  safeAreaContainer: {
    flex: 1,
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    padding: 16
  },
  firstInnerContainer: {
    flexDirection: 'row',
    marginBottom: 38
  },
  secondInnerContainer: {
    marginBottom: 24
  },
  qrCodeContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.palette.common.gray100,
    backgroundColor: theme.palette.common.gray96,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center'
  },
  backButton: {
    width: 36,
    height: 36
  },
  leftButtonIcon: {
    width: 15,
    height: 15
  },
  eventName: {
    flex: 10,
    fontWeight: 600,
    textAlign: 'center',
    color: theme.palette.common.white
  },
  ticketImage: {
    borderRadius: 8,
    height: 114
  },
  dateContainer: {
    marginTop: 8,
    padding: 7,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.palette.common.gray100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  calendarIcon: {
    width: 14,
    height: 14,
    marginRight: 17
  },
  dateLine: {
    height: 1,
    width: 9,
    backgroundColor: 'black'
  },
  qrIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  ticketIcon: {
    width: 14,
    height: 14,
    marginRight: 9,
  },
  checkBoxIcon: {
    width: 14,
    height: 14,
    marginRight: 3,
  },
  ticketButton: attended => ({
    borderRadius: 12,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 34,
    backgroundColor: attended
      ? theme.palette.common.green100
      : theme.palette.common.yellow500
  }),
  eventBgImageContainer: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    overflow: 'hidden',
    width: '100%',
    height: 180,
  },
  eventBgImage: {
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  eventBgImageSkeleton: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    height: 180
  },
  bgViewOverlay: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  carousel: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselItem: {
    flex: 1,
    alignSelf: 'center',
  },
  carouselContainer: {
    position: 'absolute',
    top: 80,
    width: 450,
    height: 350
  },
  skeletonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  skeletonButtonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 85
  },
  outerSkeletonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 85,
  }
}))
