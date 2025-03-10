import React, {useContext, useEffect, useState} from 'react'
import {
  Button,
  Icon,
  Image,
  Skeleton,
  Text
} from '@rneui/themed'
import {SafeAreaView, StatusBar, View} from 'react-native'
import {format} from 'date-fns'
import {
  fetchAttendedCount,
  fetchEvent,
  getEventCoverImagePath,
} from '../../../services/event'
import {Context} from '../../core/Store'
import CalendarIcon from '../../../assets/calendarIcon.png'
import QrIcon from '../../../assets/qr-code-line.png'
import {handleCameraPermission} from '../../../helpers/permissions'
import TicketImage from '../../components/TicketImage'
import Scanner from '../Scanner'
import ScannedTickets from './ScannedTickets'
import useStyles from './styles'

const Event = ({route, navigation}) => {
  const [state] = useContext(Context)
  const [event, setEvent] = useState({})
  const [eventImage, setEventImage] = useState()
  const [cameraModalVisible, setCameraModalVisible] = useState(false)
  const [eventFullScanned, setEventFullScanned] = useState(false)
  const [ticketsCount, setTicketsCount] = useState([])
  const [loading, setLoading] = useState(false)
  const {eventId} = route.params
  const classes = useStyles()

  useEffect(() => {
    const run = async () => {
      setLoading(true)

      try {
        const [result] = (await fetchEvent(state.firebase, eventId)).result
        let ticketCounts = (await fetchAttendedCount(state.firebase, eventId)).result

        ticketCounts = result.sales.map(sale => {
          ticketCounts[sale.ticket_type_index].name = sale.ticket_type_name

          return ticketCounts[sale.ticket_type_index]
        })

        const allTicketsScanned = ticketCounts.every(t => t.attended_count === t.total_count)

        setEventFullScanned(allTicketsScanned)
        setEvent(result)
        setTicketsCount(ticketCounts)
        setEventImage(getEventCoverImagePath(result.event_id))
      } catch (error) {
        // ignore
      }

      setLoading(false)
    }

    run()
  }, [eventId])

  const renderHeader = () => (
    <View style={classes.firstInnerContainer}>
      <View style={{flex: 2}}>
        <Button
          type='outline'
          onPress={navigation.goBack}
          buttonStyle={classes.backButton}
        >
          <Icon
            type='ant-design'
            name='left'
            size={15}
            style={classes.leftButtonIcon}
          />
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
      <TicketImage event={event} />
      <View style={classes.dateContainer}>
        <View style={classes.dateItem}>
          <Image
            source={CalendarIcon}
            style={classes.calendarIcon}
          />
          {!loading
            ? (
              <>
                <Text h7 style={{fontWeight: 500}}>
                  {format(event?.start_date || 0, 'dd.MM.yy, ')}
                </Text>
                <Text h7 style={{fontWeight: 600}}>
                  {format(event?.start_date || 0, 'HH:mm')}
                </Text>
              </>
            )
            : <Skeleton style={classes.eventDateSkeleton} />
          }
        </View>
        <View style={classes.dateLine} />
        <View style={classes.dateItem}>
          {!loading
            ? (
              <>
                <Text h7 style={{fontWeight: 500}}>
                  {format(event?.end_date || 0, 'dd.MM.yy, ')}
                </Text>
                <Text h7 style={{fontWeight: 600}}>
                  {format(event?.end_date || 0, 'HH:mm')}
                </Text>
              </>
            )
            : <Skeleton style={classes.eventDateSkeleton} />
          }
        </View>
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
      <Skeleton
        height={180}
        style={classes.eventBgImageSkeleton}
      />
    )

  const getButtonText = () => {
    const totalTickets = ticketsCount.reduce((acc, cur) => acc + cur.total_count, 0)

    switch (true) {
      case totalTickets === 0:
        return 'No tickets'
      case eventFullScanned:
        return 'All tickets have been scanned'
      default:
        return 'Scan Tickets'
    }
  }

  const onTicketVerified = ticketInfo => {
    const newVal = ticketsCount
    ticketsCount[ticketInfo?.ticket_type_index].attended_count += 1
    const allTicketsScanned = ticketsCount.every(t => t.attended_count === t.total_count)

    setTicketsCount(newVal)
    setEventFullScanned(allTicketsScanned)
  }

  const onClickOpenCamera = async () => setCameraModalVisible(await handleCameraPermission())

  return (
    <SafeAreaView style={{flex: 1}}>
      {
        Platform.OS === 'ios' &&
        <StatusBar animated={true} barStyle={'light-content'} />
      }
      {renderBgImage()}
      <View style={classes.container}>
        {renderHeader()}
        {renderEvent()}
        <ScannedTickets ticketsCount={ticketsCount} loading={loading} />
        <View style={classes.fourthInnerContainer}>
          <Scanner
            modalVisible={cameraModalVisible}
            setModalVisible={setCameraModalVisible}
            eventId={eventId}
            ticketsCount={ticketsCount}
            onTicketVerified={onTicketVerified}
          />
          <Button
            disabled={eventFullScanned}
            buttonStyle={classes.scanButton}
            onPress={onClickOpenCamera}
            loading={loading}
          >
            {!eventFullScanned && (
              <Image
                source={QrIcon}
                style={classes.qrIcon}
              />
            )}
            {!loading && (
              <Text h7 style={!eventFullScanned && classes.scanText}>
                {getButtonText()}
              </Text>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Event
