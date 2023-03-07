import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  background: {
    flex: 1,
    backgroundColor: theme.palette.common.yellow100
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center'
  },
  secondaryText: {
    width: '70%',
    textAlign: 'center',
    marginBottom: 48
  },
  shadow: {
    width: '100%',
    padding: 32
  },
  providerImage: {
    width: 40,
    height: 40
  },
  modalViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalViewItem: {
    margin: 20,
    backgroundColor: theme.palette.common.white,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTextContainer: {
    paddingHorizontal: 35,
    paddingBottom: 10
  },
  modalText: {
    textAlign: 'center'
  },
  warningIcon: {
    textAlign: 'center',
    marginBottom: 10
  }
}))
