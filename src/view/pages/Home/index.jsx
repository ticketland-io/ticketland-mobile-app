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
import {useNavigate, Link} from 'react-router-native'
import Carousel from 'react-native-reanimated-carousel';
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

const Home = () => {
  const [state] = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [todayEvents, setTodayEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const classes = useStyles()
  const navigate = useNavigate()

  const getEvents = async () => {
    try {
      setLoading(true)

      setTodayEvents((
        await fetchUserEvents(
          state.firebase,
          {
            skip: currentPage - 1,
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
  }, [])

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
              onPress={() => {navigate('/profile')}}
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
      {upcomingEvents.map((event, index) => (
        <Card
          key={index}
          event={event}
          containerStyle={classes.upcomingEventsCard}
          style={{width: '100%'}}
        />
      ))}
    </View>
  )

  const renderCarousel = () => todayEvents.length !== 0
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
          <Link
            underlayColor='white'
            activeOpacity={1}
            style={{flex: 1}}
            to={`/events/${item.event_id}`}
          >
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
    : null //TODO: add skeleton

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={classes.refreshIndicatorColor.color}
            colors={'red'}
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
          style={{paddingVertical: 28}}
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
    </SafeAreaView >
  )
}

export default Home
