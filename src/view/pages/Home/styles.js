import {makeStyles} from '@rneui/themed'

export default makeStyles(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom:36
  },
  userImage: {
    width: 30,
    height: 30,
  },
  shadowUserIcon: {
    borderRadius: 12,
    shadowOpacity: 0,
    margin:0,
    marginBottom:0
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 18
  },
}))
