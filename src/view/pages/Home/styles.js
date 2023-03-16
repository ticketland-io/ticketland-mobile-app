import {makeStyles} from '@rneui/themed'
import {Dimensions, Platform} from 'react-native'

export default makeStyles(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: theme.palette.common.white
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 18
  },
  userImage: {
    width: 30,
    height: 30,
  },
  shadowUserIcon: {
    borderRadius: 12,
    shadowOpacity: 0,
    margin: 0,
    marginBottom: 0
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 18
  },
  todaySectionTitle: {
    marginHorizontal: 16,
    marginBottom: 24
  },
  upcomingSectionTitle: {
    marginHorizontal: 16,
    transform: 'rotate(1.2deg)',
    marginBottom: 16
  },
  upcomingEventsCardContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  upcomingEventsCard: {
    paddingHorizontal: 16,
    marginBottom: 16,
    width: Dimensions.get("window").width
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row'
  },
  logoImage: {
    width: 30,
    height: 24,
    marginRight: 8
  },
  profileIconContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  cardShadow: {
    width: 320,
    padding: 8
  },
  imageCard: {
    width: '100%',
    height: 212,
    borderRadius: 14
  },
  eventName: {
    marginVertical: 8,
    paddingHorizontal: 8
  },
  infoCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  dateItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  participantsItem: {
    flex: 1,
    alignItems: 'flex-end'
  },
  calendarImage: {
    width: 14,
    height: 14,
    marginRight: 6
  },
  participantsButton: {
    width: 74,
    height: 34,
    backgroundColor: theme.palette.common.yellow500,
    padding: 8,
    borderRadius: 8,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
  },
  participantsImage: {
    width: 14,
    height: 14,
    marginRight: 6
  },
  refreshIndicatorColor: {
    color: theme.palette.common.yellow500
  },
  imageBackgroundContainer: {
    paddingVertical: 28,
    marginBottom: 20
  },
  dateText: {
    fontWeight: Platform.OS === 'android' ? 'bold' : 600
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginTop: 18
  }
}))
