import React, {useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {Link} from '@react-navigation/native'
import {format} from 'date-fns'
import {Image, Skeleton, Text} from '@rneui/themed'
import {Context} from '../../core/Store'
import Shadow from '../../components/Shadow'
import UserIcon from '../../../assets/userIcon.png'
import CalendarIcon from '../../../assets/calendarIcon.png'
import {fetchAttendedCount, getEventCoverImagePath} from '../../../services/event'
import useStyles from './styles'

const Card = props => {
  const {
    event,
    style = '',
    containerStyle = '',
    loading = false
  } = props
  const [totalScanned, setTotalScanned] = useState(0)
  const [state] = useContext(Context)
  const classes = useStyles()

  useEffect(() => {
    const run = async () => {
      try {
        const {result} = (await fetchAttendedCount(state.firebase, event.event_id))
        const total = result.reduce((acc, cur) => acc += cur.attended_count, 0)

        setTotalScanned(total)
      } catch (error) {
        //ignore
      }
    }

    run()
  }, [event])

  return (
    <View style={[{flex: 1}, containerStyle]}>
      <Link to={{screen: state.mode === 'user' ? 'Ticket' : 'Event', params: {eventId: event?.event_id}}}>
        <Shadow
          style={[classes.cardShadow, style]}
          styleInner={{borderRadius: 0}}
        >
          <View justifyContent='center'>
            {!loading
              ? <Image
                source={{uri: getEventCoverImagePath(event?.event_id, event?.file_type)}}
                style={classes.imageCard}
              />
              : <Skeleton width={'100%'} style={{borderRadius: 16, height: 212}} />
            }
          </View>
          {!loading
            ? (
              <Text eventName style={classes.eventName}>
                {event.name}
              </Text>
            )
            : (
              <View style={classes.eventName}>
                <Skeleton width={150} style={{borderRadius: 8}} />
              </View>
            )
          }
          <View style={classes.infoCardContainer}>
            <View style={classes.dateItem}>
              <Image
                source={CalendarIcon}
                style={classes.calendarImage}
              />
              {!loading
                ? (
                  <Text h7 style={classes.dateText}>
                    {format(event?.start_date || 0, 'dd.MM.yy')}
                  </Text>
                )
                : <Skeleton width={100} height={15} circle />}
            </View>
            <View style={classes.participantsItem}>
              {!loading
                ? (
                  <View style={classes.participantsButton}>
                    <Image
                      source={UserIcon}
                      style={classes.participantsImage}
                    />
                    <Text h6Bold>{totalScanned}</Text>
                  </View>
                )
                : <Skeleton width={74} height={34} style={{borderRadius: 8}} />
              }
            </View>
          </View>
        </Shadow>
      </Link>
    </View>
  )
}

export default Card
