import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  Dimensions,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View
} from 'react-native'
import {Button, Image, Text} from '@rneui/themed'
import {Input} from '@rneui/themed';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Context} from '../../core/Store'
import {getEndOfDay, getStartOfDay, getStartOfTomorrow} from '../../../helpers/time';
import {fetchEvents} from '../../../services/event'
import SectionTitle from '../../components/SectionTitle'
import Shadow from '../../components/Shadow'
import Logo from '../../../assets/logo.png'
import SearchIcon from '../../../assets/searchIcon.png'
import Dot from '../../../assets/dot.png'
import Card from './Card'
import useStyles from './styles'

const DEFAULT_LIMIT = 5

const Home = ({navigation}) => {
  const [state] = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [todayEvents, setTodayEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [stopFetching, setStopFetching] = useState(false)
  const classes = useStyles()

  const getEvents = async () => {
    try {
      setLoading(true)

      setTodayEvents((
        await fetchEvents(
          state.firebase,
          {
            skip: currentPage - 1,
            limit: 20,
            search: searchFilter,
            startDateFrom: getStartOfDay(),
            startDateTo: getEndOfDay()
          },
          state.mode
        )
      ).result)

      setUpcomingEvents((
        await fetchEvents(
          state.firebase,
          {
            skip: currentPage - 1,
            search: searchFilter,
            startDateFrom: getStartOfTomorrow()
          },
          state.mode
        )
      ).result)

    } catch (error) {
      // ignore
    }

    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    getEvents()
  }, [searchFilter])

  useEffect(() => {
    const run = async () => {
      getEvents()
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
        <View style={{justifyContent: 'center'}}>
          <Text>{state.mode} mode</Text>
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
    </View>
  )

  const renderUpcomingEvents = () => upcomingEvents.length > 0
          ? upcomingEvents.map((event) => (
            <View key={event.event_id} style={classes.upcomingEventsCardContainer}>
              <Card
                loading={false}
                event={event}
                containerStyle={classes.upcomingEventsCard}
                // this has to be like that cause of android issue of shadow package with percentages
                style={{width: Dimensions.get("window").width - 32}}
              />
            </View>

          )
          ) : (
            <Text h5 style={{textAlign: 'center'}}>
              No events found
            </Text>
          )

  const renderUpcomingSection = () => (
    <View style={{marginBottom: 28}}>
      <SectionTitle
        style={classes.upcomingSectionTitle}
        innerStyle={{transform: 'rotate(-1.2deg)'}}
        title={'Upcoming'}
      />
      {!loading
        ? renderUpcomingEvents()
        : <Card
          loading={true}
          containerStyle={classes.upcomingEventsCard}
          style={{width: Dimensions.get("window").width - 32}}
        />
      }
    </View>
  )

  const renderCarouselItem = ({item}) => (
    <Card
      key={item.event_id}
      event={item}
      containerStyle={{paddingHorizontal: 16}}
    />
  )

  const renderTodayEvents = () => todayEvents.length > 0
    ? <Carousel
          snapEnabled={false}
          pagingEnabled={false}
          width={340}
          height={330}
          loop={false}
          style={{width: '100%'}}
          data={todayEvents}
          renderItem={renderCarouselItem}
        />
        : (
          <Text h5 style={{textAlign: 'center'}}>
            No events found
          </Text>
        )

  const renderCarousel = () => !loading
    ? renderTodayEvents()
    : (
      <Card
        loading={true}
        containerStyle={{paddingHorizontal: 16}}
      />
    )

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const scrollRefresh = async () => {
    if (!stopFetching) {
      const {result} = await fetchEvents(
        state.firebase,
        {
          skip: currentPage,
          search: searchFilter,
          startDateFrom: getStartOfTomorrow()
        },
        state.mode
      )

      setUpcomingEvents([...upcomingEvents, ...result])
      if (result.length < DEFAULT_LIMIT) {
        setStopFetching(true)
      }
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar animated={true} barStyle='dark-content' />
      {/* GestureHandlerRootView added for android use */}
      <GestureHandlerRootView>
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={classes.refreshIndicatorColor.color}
              colors={[classes.refreshIndicatorColor.color]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onMomentumScrollEnd={scrollRefresh}
          stickyHeaderIndices={[0]}
        >
          <View style={classes.container}>
            {renderHeader()}
          </View>
          <View style={classes.searchBarContainer}>
            <Input
              placeholder='Find event'
              leftIcon={<Image source={SearchIcon} style={classes.searchIcon} />}
              onChangeText={value => {setSearchFilter(value)}}
            />
          </View>
          <ImageBackground
            source={Dot}
            resizeMode="repeat"
            style={classes.imageBackgroundContainer}
          >
            <SectionTitle style={classes.todaySectionTitle} title={'Today'} />
            {renderCarousel()}
          </ImageBackground>
          {renderUpcomingSection()}
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView >
  )
}

export default Home
