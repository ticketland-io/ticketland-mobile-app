import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  root: {
    borderWidth: 1,
    shadowColor: theme.palette.common.black,
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 1,
    borderRadius: 16,
    margin: 10,
    marginBottom: 20,
    borderColor: theme.palette.common.yellow500,
    backgroundColor: theme.palette.common.white,
  },
  inner: {
    borderRadius: 16,
    overflow: 'hidden'
  }
}))
