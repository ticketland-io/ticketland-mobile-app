import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, StatusBar, View} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {format} from 'date-fns'
import QRCode from 'react-native-qrcode-svg'
import Carousel from 'react-native-reanimated-carousel'
import {Button, Icon, Image, Skeleton, Text} from '@rneui/themed'
import {Context} from '../../core/Store'
import {fetchTickets, normalizeEventId} from '../../../services/ticket'
import {getSignedMessage} from '../../../services/message'
import {
  fetchEvent,
  get_event_cover_image_path,
  get_event_ticket_image_path
} from '../../../services/event'
import {duration} from '../../../helpers/time'
import Logo from '../../../assets/logo.png'
import TicketIcon from '../../../assets/ticket.png'
import CalendarIcon from '../../../assets/calendarIcon.png'
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
  const [signatures, setSignatures] = useState([])
  const [allTicketsScanned, setAllTicketsScanned] = useState(true)
  let pubkey

  const getFilteredTickets = async () => {
    const {result} = await fetchTickets(state.firebase, eventId)

    return result.filter((ticket) => !ticket.sell_listing)
  }

  const getEventData = async () => {
    setLoading(true)
    try {
      const [result] = (await fetchEvent(state.firebase, eventId)).result
      let tickets = await getFilteredTickets()

      tickets = tickets.map(ticket => {
        if (ticket.attended) {
          setAllTicketsScanned(false)
        }

        return {
          ...ticket,
          name: result.sales[ticket.ticket_type_index].ticket_type_name
        }
      })

      setTickets(tickets)
      setEvent(result)
      setEventImage(
        get_event_cover_image_path(result.event_id),
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
      //ignore
    }
  }

  useEffect(() => {
    const run = async () => {
      pubkey = (await state.walletCore.fetchAccount()).pubkey
      setSignatures(await Promise.all(
        tickets.map(async ticket => {
          try {
            return await getSignedMessage(
              state.web3,
              normalizeEventId(eventId),
              '',
              ticket.ticket_metadata,
            )
          } catch (error) {
            //ignore
          }
        })
      ))
    }

    tickets.length > 0 && run()
  }, [tickets])


  useEffect(() => {
    getEventData()

    return () => {
      clearTimeout(timerId)
    };
  }, [eventId])

  useEffect(() => {
    if (timer > 0 && qrCodeData.length > 0 && !allTicketsScanned) {
      setTimerId(
        setTimeout(() => {
          setTimer(timer - 1)
        }, duration.seconds(1)),
      )
    } else if (!allTicketsScanned) {
      clearTimeout(timerId)
      setTimer(60)
    }
  }, [timer, qrCodeData, allTicketsScanned])

  useEffect(() => {
    const run = async () => {
      const qrCodesArray = tickets.map((ticket, index) => JSON.stringify({
        ticketMetadata: ticket.ticket_metadata,
        ticketNft: ticket.ticket_nft,
        codeChallenge: '',
        ticketOwnerPubkey: pubkey,
        sig: signatures[index],
        eventId: eventId,
        expTimestamp: Date.now() + duration.minutes(1),
      })
      )

      setQrCodeData(qrCodesArray)
      setLoading(false)
    }

    tickets.length > 0 && signatures.length > 0 && timer === 60 && run()
  }, [signatures, timer])

  const renderHeader = () => (
    <View style={classes.firstInnerContainer}>
      <View style={{flex: 2}}>
        <Button
          color='white'
          onPress={navigation.goBack}
          buttonStyle={classes.backButton}
        >
          <Icon name='left' size={15} type='ant-design' style={classes.leftButtonIcon} />
        </Button>
      </View>
      <Text h4 style={classes.eventName}>
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

  const renderCarouselItem = ({item, index}) => (
    <View
      style={classes.carouselItem}
      key={index}
    >
      {qrCodeData.length > 0 && !item.attended ? (
        <QRCode
          value={qrCodeData[index]}
          logo={Logo}
          logoSize={70}
          logoBackgroundColor='white'
          size={250}
        />
      ) : (
        <Icon
          name='checksquareo'
          type='ant-design'
          color='green'
          size={100}
          containerStyle={classes.checkIcon}
        />
      )
      }
      <View
        style={classes.ticketButton(item.attended)}
      >
        <Image source={TicketIcon} style={classes.ticketIcon} />
        <Text h7>
          {item.name} #{item.seat_index}
        </Text>
      </View>
    </View>
  )

  const renderCarousel = () =>
    !loading ? (
      <Carousel
        width={270}
        loop={false}
        style={classes.carousel}
        data={tickets}
        renderItem={renderCarouselItem}
      />
    ) : (
      <View style={classes.outerSkeletonContainer}>
        <View style={classes.skeletonContainer}>
          <Skeleton width={260} height={260} />
        </View>
        <View style={classes.skeletonButtonContainer}>
          <Skeleton width={260} height={35} style={{borderRadius: 12}} />
        </View>
      </View>
    )

  const renderBgImage = () => !loading
    ? (
      <View style={classes.eventBgImageContainer}>
        <Image
          source={{uri: eventImage}}
          style={classes.eventBgImage}
        />
        <View style={classes.bgViewOverlay} />
      </View>
    )
    : (
      <Skeleton height={180} style={classes.eventBgImageSkeleton} />
    )

  return (
    <SafeAreaView style={classes.safeAreaContainer}>
      {
        Platform.OS === 'ios' &&
        <StatusBar animated={true} barStyle={'light-content'} />
      }
      {renderBgImage()}
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={classes.container}>
          {renderHeader()}
          {renderEvent()}
          <View style={classes.qrCodeContainer}>
            {allTicketsScanned
              ? <Text h4>All tickets scanned</Text>
              : <Text h4>Scan the ticket QR Code</Text>
            }
            {!allTicketsScanned && <Text>Refresh in: {timer}</Text>}
            <View style={classes.carouselContainer}>
              {renderCarousel()}
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default Ticket
