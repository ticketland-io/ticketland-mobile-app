import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 16
  },
  firstInnerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  secondInnerContainer: {
    flex: 4,
    justifyContent: 'center'
  },
  thirdInnerContainer: {
    flex: 4,
    justifyContent: 'flex-end'
  },
  backButton: {
    width: 36,
    height: 36,
    borderWidth: 1
  },
  leftButtonIcon: {
    width: 15,
    height: 15
  },
  accountText: {
    flex: 4,
    fontWeight: 600,
    textAlign: 'center'
  },
  userImage: {
    width: 100,
    height: 100,
  },
  modeButton: {
    width: '80%',
    height: 45,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme.palette.common.gray200
  },
  logoutButton: {
    width: '80%',
    height: 45,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: theme.palette.common.gray200,
    backgroundColor: theme.palette.common.error
  },
  logoutIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    color:theme.palette.common.white
  },
  displayName: {
    textAlign: 'center',
    fontWeight: 600
  }
}))
