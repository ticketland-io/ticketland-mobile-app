import {Button, Image, Skeleton, Text} from '@rneui/themed'
import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, StatusBar, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import AntIcon from 'react-native-vector-icons/AntDesign'
import {format} from 'date-fns'
import QRCode from 'react-native-qrcode-svg'
import Carousel from 'react-native-reanimated-carousel'
import {Context} from '../../core/Store'
import Logo from '../../../assets/logo.png'
import TicketIcon from '../../../assets/ticket.png'
import CalendarIcon from '../../../assets/calendarIcon.png'
import {fetchTickets, normalizeEventId} from '../../../services/ticket'
import {getSignedMessage} from '../../../services/message'
import {fetchEvent, get_event_cover_image_path, get_event_ticket_image_path} from '../../../services/event'
import {getImageColors, invertColor} from '../../../helpers/color'
import useStyles from './styles'

const Ticket = ({route, navigation}) => {
  const [state] = useContext(Context)
  const classes = useStyles()
  const {eventId} = route.params
  const [tickets, setTickets] = useState([])
  const [qrCodeData, setQrCodeData] = useState([])
  const [eventImage, setEventImage] = useState()
  const [ticketImage, setTicketImage] = useState()
  const [event, setEvent] = useState({})
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [timerId, setTimerId] = useState(0)
  const [colorFont, setColorFont] = useState(false)

  const getFilteredTickets = async () => {
    const {result} = await fetchTickets(state.firebase, eventId)

    const unAttendedTickets = result.reduce(
      (acc, cur) => (!cur.sell_listing ? [...acc, cur] : acc),
      [],
    )

    return unAttendedTickets
  }

  const getEventData = async () => {
    setLoading(true)
    try {
      const [result] = (await fetchEvent(state.firebase, eventId)).result
      let tickets = await getFilteredTickets()

      tickets = tickets.map(ticket => {
        ticket.name = result.sales[ticket.ticket_type_index].ticket_type_name

        return ticket
      })

      const imageColors = await getImageColors(
        get_event_cover_image_path(result.event_id, result.file_type),
      )

      setColorFont(invertColor(imageColors, true))
      setTickets(tickets)
      setEvent(result)
      setEventImage(
        get_event_cover_image_path(result.event_id, result.file_type),
      )
      setTicketImage(
        get_event_ticket_image_path(
          result.event_id,
          result.start_date,
          result.end_date,
          result.ticket_images,
        ),
      )
    } catch (error) {
      console.log(error)
      //ignore
    }

    // setLoading(false)
  }

  useEffect(() => {
    getEventData()
  }, [eventId])

  useEffect(() => {
    if (timer > 0 && qrCodeData.length > 0) {
      setTimerId(
        setTimeout(() => {
          setTimer(timer - 1)
        }, 1000),
      )
    } else {
      clearTimeout(timerId)
      setTimer(60)
    }
  }, [timer, qrCodeData])

  useEffect(() => {
    const run = async () => {
      const qrCodesArray = await Promise.all(
        tickets.map(async ticket => {
          try {
            return JSON.stringify({
              ticketMetadata: ticket.ticket_metadata,
              ticketNft: ticket.ticket_nft,
              codeChallenge: '',
              ticketOwnerPubkey: (await state.eutopicCore.fetchAccount())
                .pubkey,
              sig: await getSignedMessage(
                state.web3,
                normalizeEventId(eventId),
                '',
                ticket.ticket_metadata,
              ),
              eventId: eventId,
              expTimestamp: Date.now() + 60000,
            })
          } catch (error) {
            //ignore
            // console.log(first)
          }
        }),
      )

      setQrCodeData(qrCodesArray)
      setLoading(false)
    }

    tickets.length > 0 && timer === 60 && run()
  }, [tickets, state.web3, timer])

  const renderHeader = () => (
    <View style={classes.firstInnerContainer}>
      <View style={{flex: 2}}>
        <Button
          color="white"
          onPress={navigation.goBack}
          buttonStyle={classes.backButton}
        >
          <AntIcon name="left" size={15} style={classes.leftButtonIcon} />
        </Button>
      </View>
      <Text h4 style={[classes.eventName, {color: colorFont}]}>
        {event.name}
      </Text>
      <View style={{flex: 2}} />
    </View>
  )

  const renderEvent = () => (
    <View style={classes.secondInnerContainer}>
      {!loading ? (
        <Image
          source={{uri: ticketImage}}
          containerStyle={classes.ticketImage}
        />
      ) : (
        <Skeleton style={classes.ticketImage} />
      )}
      <View style={classes.dateContainer}>
        <View style={classes.dateItem}>
          <Image source={CalendarIcon} style={classes.calendarIcon} />
          {!loading ? (
            <>
              <Text h7 style={{fontWeight: 500}}>
                {format(event?.start_date || 0, 'dd.MM.yy, ')}
              </Text>
              <Text h7 style={{fontWeight: 600}}>
                {format(event?.start_date || 0, 'HH:mm')}
              </Text>
            </>
          ) : (
            <Skeleton width={120} height={15} />
          )}
        </View>
        <View style={classes.dateLine} />
        <View style={classes.dateItem}>
          {!loading ? (
            <>
              <Text h7 style={{fontWeight: 500}}>
                {format(event?.end_date || 0, 'dd.MM.yy, ')}
              </Text>
              <Text h7 style={{fontWeight: 600}}>
                {format(event?.end_date || 0, 'HH:mm')}
              </Text>
            </>
          ) : (
            <Skeleton width={120} height={15} />
          )}
        </View>
      </View>
    </View>
  )

  const renderCarousel = () =>
    !loading ? (
      <Carousel
        width={280}
        // height={280}
        loop={false}
        style={{flex: 1, width: '100%', justifyContent: 'center'}}
        data={tickets}
        renderItem={({item, index}) => {
          console.log(item.attended)
          return (
            <View
              style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
              key={index}
            >
              {qrCodeData.length > 0 ? (
                <QRCode
                  value={qrCodeData[index]}
                  logo={Logo}
                  logoSize={70}
                  logoBackgroundColor="white"
                  size={250}
                />
              ) : null}
              <Button
                buttonStyle={[
                  classes.ticketButton,
                  {backgroundColor: item.attended ? '#60b563' : '#FFED00'},
                ]}
              >
                <Image source={TicketIcon} style={classes.ticketIcon} />
                <Text h7>
                  {item.name} #{item.seat_index}
                </Text>
              </Button>
            </View>
          )
        }}
      />
    ) : (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          marginTop: 50,
        }}
      >
        <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
          <Skeleton width={250} height={250} />
        </View>
        <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
          <Skeleton width={250} height={35} />
        </View>
      </View>
    )

  const renderBgImage = () =>
    !loading ? (
      <View style={{position: 'absolute', top: 0, width: '100%'}}>
        <Image
          source={{uri: eventImage}}
          style={{
            height: 180,
            borderBottomRightRadius: 24,
            borderBottomLeftRadius: 24,
          }}
        />
      </View>
    ) : (
      <Skeleton
        height={180}
        style={{
          position: 'absolute',
          top: 0,
          borderBottomRightRadius: 24,
          borderBottomLeftRadius: 24,
        }}
      />
    )

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        barStyle={colorFont === '#FFFFFF' ? 'light-content' : 'dark-content'}
      />
      {renderBgImage()}
      <GestureHandlerRootView
        style={{flex: 1}}
        onHandlerStateChange={() => {
          console.log('first')
        }}
      >
        <View style={classes.container}>
          {renderHeader()}
          {renderEvent()}
          <View style={classes.qrCodeContainer}>
            <Text h4>Scan the ticket QR Code</Text>
            <Text>Refresh in: {timer}</Text>
            {renderCarousel()}
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default Ticket
