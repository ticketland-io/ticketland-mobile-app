import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
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
  scannedTicketsContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.palette.common.gray100,
    backgroundColor: theme.palette.common.gray96,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  scannedTicketsInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16
  },
  fourthInnerContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  backButton: {
    width: 36,
    height: 36,
    backgroundColor: theme.palette.common.white,
  },
  leftButtonIcon: {
    width: 15,
    height: 15
  },
  eventName: {
    flex: 10,
    fontWeight: 600,
    textAlign: 'center',
    color:theme.palette.common.black
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
  scanButton: {
    backgroundColor: theme.palette.common.gray800,
  },
  scanText: {
    color: theme.palette.common.white,
    paddingVertical: 2
  },
  totalVisitorsItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  progressBarContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 8
  },
  progressBarSkeletonContainer: {
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
    height: 40
  },
  yellowProgress: {
    backgroundColor: theme.palette.common.yellow500,
    height: 40,
  },
  grayProgress: {
    backgroundColor: theme.palette.common.gray100,
    height: 40,
  },
  progressBarInfoContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  progressBarTicketInfoItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  successItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventDateSkeleton: {
    width: 100,
    marginVertical: 4
  },
  eventBgImageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  eventBgImage: {
    height: 180,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24
  },
  eventBgImageSkeleton: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    height: 180
  }
}))
