import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  root: {
    justifyContent:'center',
    flexDirection:'row',
    width: '50%',
    backgroundColor: theme.palette.common.yellow500,
    paddingVertical: 12,
    borderRadius: 8,
    transform: 'rotate(-1.2deg)'
  },
  eventsText: {
    fontWeight: 'normal',
  }
}))
