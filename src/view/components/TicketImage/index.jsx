import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {
  Button,
  Image,
  Skeleton,
  Text,
} from '@rneui/themed'
import {sharePdf} from '../../../helpers/share'
import {getEventTicketImagePath} from '../../../services/event'
import useStyles from './styles'

const TicketImage = props => {
  const {event} = props
  const [ticketImage, setTicketImage] = useState()
  const [ticketImageRatio, setTicketImageRatio] = useState()
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    const run = () => {
      setLoading(true)

      try {
        const imageResult = getEventTicketImagePath(
          event.event_id,
          event.start_date,
          event.end_date,
          event.ticket_images,
        )

        setTicketImage(imageResult)

        Image.getSize(imageResult.url, (width, height) => setTicketImageRatio(width / height))
      } catch (error) {
        // ignore
      }

      setLoading(false)
    }

    event?.event_id && run()
  }, [event?.event_id])

  const renderTicket = () => ticketImage?.content_type === 'pdf'
    ? (
      <View>
        <Button
          onPress={() => sharePdf(event.event_id, ticketImage)}
          buttonStyle={classes.pdfButton}
        >
          <Text h7>
            Open PDF
          </Text>
        </Button>
      </View>
    )
    : (
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: ticketImage?.url}}
          style={classes.ticketImage(ticketImageRatio)}
        />
      </View>
    )

  return !loading
    ? renderTicket()
    : <Skeleton style={classes.ticketImageSkeleton} />
}

export default TicketImage
