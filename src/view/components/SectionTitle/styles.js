import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  root: {
    flexDirection:'row',
    alignSelf: 'flex-start',
    backgroundColor: theme.palette.common.yellow500,
    padding: 12,
    borderRadius: 8,
    transform: 'rotate(-1.2deg)'
  },
  innerRoot: {
    flexDirection:'row',
    transform: 'rotate(1.2deg)'
  }
}))
