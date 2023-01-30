import React, {useContext, useEffect, useState} from 'react'
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native'
import {Button, Image, Text} from '@rneui/themed'
import {useNavigate} from 'react-router-native'
import {Context} from '../../core/Store'
import Shadow from '../../components/Shadow'
import Logo from '../../../assets/logo.png'
import useStyles from './styles'
import {Input} from '@rneui/themed';
import SearchIcon from '../../../assets/searchIcon.png'
import Dot from '../../../assets/dot.png'
import SectionTitle from '../../components/SectionTitle'
import Card from './Card'
import Carousel from 'react-native-reanimated-carousel';
import Pagination from './Pagination';
import {fetchAllEvents} from '../../../services/event'

const Home = () => {
  const [state] = useContext(Context)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const classes = useStyles()
  const navigate = useNavigate()

  // const test = async () => {
  //   console.log(await state.eutopicCore.Wallet().signMessage('test'))
  // }

  const getEvents = async () => {
    try {
      setLoading(true)
      setEvents((await fetchAllEvents()).result)
    } catch (error) {
      // ignore
    }
    setLoading(false)
  }

  useEffect(() => {
    getEvents()
  }, [])

  // useEffect(() => {
  //   test()
  // }, [])

  const renderHeader = () => (
    <View style={{flex: 1}}>
      <View style={classes.headerContainer}>
        <View style={{flex: 1, alignSelf: 'center', flexDirection: 'row'}}>
          <Image source={Logo} style={{width: 30, height: 24, marginRight: 8}} />
          <View style={{justifyContent: 'center'}}>
            <Text>Ticketland</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Shadow alignSelf='flex-end' style={classes.shadowUserIcon} styleInner={{borderRadius: 12}}>
            <Button type='clear' buttonStyle={classes.userImage} onPress={() => {navigate('/profile')}}>
              <Image source={{uri: state.user?.photoURL}} style={classes.userImage} />
            </Button>
          </Shadow>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Input
          placeholder='Find event'
          leftIcon={
            <Image source={SearchIcon} style={classes.searchIcon} />
          }
        />
      </View>
    </View>

  )

  const renderUpcomingEvents = () => (
    <View>
      <SectionTitle style={{marginHorizontal: 16}} title={'Upcoming'} />
      {events.map((event, index) => (
        <Card event={event} key={index} style={{width: 345, marginHorizontal: 16}} />
      ))}
    </View>
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={classes.container}>
          {renderHeader()}
        </View>
        <ImageBackground source={Dot} resizeMode="repeat" style={{paddingVertical: 40}}>
          <SectionTitle style={{marginHorizontal: 16}} title={'Today'} />
          {events.length
            ? (
              <Carousel
                //TODO: check if it fits on other screens
                width={340}
                height={330}
                // width={375 * 0.85}
                loop={false}
                style={{width: '100%'}}
                // autoPlay={true}
                // autoPlayInterval={2000}
                data={events}
                // onSnapToItem={index => console.log("current index:", index)}
                renderItem={({item, index}) => (
                  <Card event={item} key={index} index={index} />
                )}
              />
            )
            : null //TODO: add skeleton
          }
        </ImageBackground>
        {renderUpcomingEvents()}
        <Pagination
          // className="pagination-bar"
          currentPage={currentPage}
          totalCount={events.length}
          pageSize={5}
          siblingCount={1}
          onPageChange={page => setCurrentPage(page)}
        />
      </ScrollView>
    </SafeAreaView >
  )
}

export default Home
