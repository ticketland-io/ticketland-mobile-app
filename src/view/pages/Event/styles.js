import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 16
  },
  firstInnerContainer: {
    // flex: 1,
    flexDirection: 'row',
    marginBottom: 38
  },
  secondInnerContainer: {
    // flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center'
    marginBottom: 24
  },
  scannedTicketsContainer: {
    // flex: 1,
    // backgroundColor:'blue',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.palette.common.gray100,
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  fourthInnerContainer: {
    flex: 1,
    // backgroundColor: 'purple',
    justifyContent: 'flex-end'
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
    // color: theme.palette.common.white
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
    paddingVertical:2
  }
}))
