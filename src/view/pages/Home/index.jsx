import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'
import {Button, Image, Text} from '@rneui/themed'
import {Input} from '@rneui/themed';
import {Link} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Context} from '../../core/Store'
import {getEndOfDay, getStartOfDay, getStartOfTomorrow} from '../../../helpers/time';
import {fetchUserEvents} from '../../../services/event'
import SectionTitle from '../../components/SectionTitle'
import Shadow from '../../components/Shadow'
import Logo from '../../../assets/logo.png'
import SearchIcon from '../../../assets/searchIcon.png'
import Dot from '../../../assets/dot.png'
import Card from './Card'
import Pagination from './Pagination';
import useStyles from './styles'

const Home = ({navigation}) => {
  const [state] = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [todayEvents, setTodayEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const classes = useStyles()

  const getEvents = async () => {
    try {
      setLoading(true)

      setTodayEvents((
        await fetchUserEvents(
          state.firebase,
          {
            skip: currentPage - 1,
            search: searchFilter,
            startDateFrom: getStartOfDay(),
            startDateTo: getEndOfDay()
          }
        )
      ).result)

      setUpcomingEvents((
        await fetchUserEvents(
          state.firebase,
          {
            skip: currentPage - 1,
            search: searchFilter,
            startDateFrom: getStartOfTomorrow()
          }
        )
      ).result)
    } catch (error) {
      // ignore
    }

    setLoading(false)
  }

  useEffect(() => {
    getEvents()
  }, [searchFilter, currentPage])

  useEffect(() => {
    const run = async () => {
      getEvents()
      setRefreshing(false)
    }

    refreshing && run()
  }, [refreshing])

  const renderHeader = () => (
    <View style={{flex: 1}}>
      <View style={classes.headerContainer}>
        <View style={classes.logoContainer}>
          <Image source={Logo} style={classes.logoImage} />
          <View style={{justifyContent: 'center'}}>
            <Text>Ticketland</Text>
          </View>
        </View>
        <View style={classes.profileIconContainer}>
          <Shadow
            alignSelf='flex-end'
            style={classes.shadowUserIcon}
            styleInner={{borderRadius: 12}}
          >
            <Button
              type='clear'
              buttonStyle={classes.userImage}
              onPress={() => {navigation.push('Profile')}}
            >
              <Image source={{uri: state.user?.photoURL}} style={classes.userImage} />
            </Button>
          </Shadow>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Input
          placeholder='Find event'
          leftIcon={<Image source={SearchIcon} style={classes.searchIcon} />}
          onChangeText={value => {setSearchFilter(value)}}
        />
      </View>
    </View>

  )

  const renderUpcomingEvents = () => (
    <View style={{marginBottom: 28}}>
      <SectionTitle
        style={classes.upcomingSectionTitle}
        innerStyle={{transform: 'rotate(-1.2deg)'}}
        title={'Upcoming'}
      />
      {!loading
        ? upcomingEvents.map((event, index) => (
          <Link key={index} to={{screen: 'Event', params: {eventId: event.event_id}}}>
            <View style={classes.upcomingEventsCardContainer}>
          <Card
                loading={false}
            event={event}
            containerStyle={classes.upcomingEventsCard}
            style={{width: '100%'}}
          />
            </View>
          </Link>
        ))
        : <Card
          loading={true}
          containerStyle={classes.upcomingEventsCard}
          style={{width: '100%'}}
        />
      }
    </View>
  )

  const renderCarousel = () => !loading
    ? (
      <Carousel
        snapEnabled={false}
        pagingEnabled={false}
        width={340}
        height={330}
        loop={false}
        style={{width: '100%'}}
        data={todayEvents}
        renderItem={({item, index}) => (
          <Link key={index} to={{screen: 'Event', params: {eventId: item.event_id}}}>
            <Card
              event={item}
              key={index}
              index={index}
              containerStyle={{paddingHorizontal: 16}}
            />
          </Link>
        )}
      />
    )
    : (
      <Card
        loading={true}
        containerStyle={{paddingHorizontal: 16}}
      />
    )

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* GestureHandlerRootView added for android use */}
      <GestureHandlerRootView onHandlerStateChange={() => {console.log('first')}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={classes.refreshIndicatorColor.color}
            colors={[classes.refreshIndicatorColor.color]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={classes.container}>
          {renderHeader()}
        </View>
        <ImageBackground
          source={Dot}
          resizeMode="repeat"
          style={classes.imageBackgroundContainer}
        >
          <SectionTitle style={classes.todaySectionTitle} title={'Today'} />
          {renderCarousel()}
        </ImageBackground>
        {renderUpcomingEvents()}
        <Pagination
          currentPage={currentPage}
          totalCount={upcomingEvents.length}
          pageSize={5}
          onPageChange={page => setCurrentPage(page)}
        />
      </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView >
  )
}

export default Home
