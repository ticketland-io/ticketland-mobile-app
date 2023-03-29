import React, {useContext, useEffect, useState} from 'react'
import {Button, Icon, Image, Skeleton, Text} from '@rneui/themed'
import {SafeAreaView, StatusBar, View} from 'react-native'
import {format} from 'date-fns'
import {
  fetchAttendedCount,
  fetchEvent,
  get_event_cover_image_path,
  get_event_ticket_image_path
} from '../../../services/event'
import {Context} from '../../core/Store'
import CalendarIcon from '../../../assets/calendarIcon.png'
import QrIcon from '../../../assets/qr-code-line.png'
import Scanner from '../Scanner'
import ScannedTickets from './ScannedTickets'
import useStyles from './styles'

const Event = ({route, navigation}) => {
  const [state] = useContext(Context)
  const [event, setEvent] = useState({})
  const [eventImage, setEventImage] = useState()
  const [ticketImage, setTicketImage] = useState()
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

        ticketCounts = result.sales.map((sale) => {
          ticketCounts[sale.ticket_type_index].name = sale.ticket_type_name

          return ticketCounts[sale.ticket_type_index]
        })

        const allTicketsScanned = ticketCounts.every(t => t.attended_count === t.total_count)

        setEventFullScanned(allTicketsScanned)
        setEvent(result)
        setTicketsCount(ticketCounts)
        setEventImage(get_event_cover_image_path(result.event_id))
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

      setLoading(false)
    }

    run()
  }, [eventId])

  const renderHeader = () => (
    <View style={classes.firstInnerContainer}>
      <View style={{flex: 2}}>
        <Button
          type="outline"
          onPress={navigation.goBack}
          buttonStyle={classes.backButton}
        >
          <Icon
            type="ant-design"
            name="left"
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
      {!loading
        ? <Image source={{uri: ticketImage}} containerStyle={classes.ticketImage} />
        : <Skeleton style={classes.ticketImage} />
      }
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
            setTicketsCount={setTicketsCount}
            ticketsCount={ticketsCount}
          />
          <Button
            disabled={eventFullScanned}
            buttonStyle={classes.scanButton}
            onPress={() => setCameraModalVisible(true)}
            loading={false}
          >
            {!eventFullScanned && <Image
              source={QrIcon}
              style={classes.qrIcon}
            />}
            <Text h7 style={!eventFullScanned && classes.scanText}>
              {eventFullScanned ? 'All tickets have been scanned' : 'Scan Tickets'}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Event
