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
  shadowContainer: {
    width: '100%',
    padding: 32
  },
  providerImage: {
    width: 40,
    height: 40
  },
  modalText: {
    textAlign: 'center'
  },
  warningIcon: {
    textAlign: 'center',
    marginBottom: 10
  },
  shadow: loading => ({
    padding: 24,
    opacity: loading ? 0.8 : 1
  })
}))
