/* eslint-disable camelcase */
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {
  Button,
  Dialog,
  Image,
  Skeleton,
  Text,
} from '@rneui/themed'
import {Picker} from '@react-native-picker/picker'
import {sharePdf} from '../../../helpers/share'
import useStyles from './styles'
import {getTicketNftImagePath} from '../../../services/event'

const TicketImage = props => {
  const {event, ticketType} = props
  const [ticketTypeFiles, setTicketTypeFiles] = useState([])
  const [ticketImageRatio, setTicketImageRatio] = useState()
  const [isVisibleTicketType, setIsVisibleTicketType] = useState(false)
  const [isVisibleTicketImage, setIsVisibleTicketImage] = useState(false)
  const [curTicketTypeIndex, setCurTicketTypeIndex] = useState(0)
  const [curTicketImageIndex, setCurTicketImageIndex] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    if (event?.event_id) {
      const ticketFilesResult = event.ticket_types.reduce((acc, cur) => [...acc, cur.ticket_type_nft_details], [])

      setTicketTypeFiles(ticketFilesResult)
    }
  }, [event?.event_id])

  useEffect(() => {
    const run = () => {
      const url = getTicketNftImagePath(
        event.event_id,
        ticketTypeFiles[curTicketTypeIndex][curTicketImageIndex].ref_name,
      )

      Image.getSize(url, (width, height) => setTicketImageRatio(width / height))
    }

    if (event && ticketTypeFiles.length) {
      run()
    }
  }, [event, curTicketTypeIndex, curTicketImageIndex, ticketTypeFiles])

  const renderTicket = () => ticketTypeFiles?.[curTicketTypeIndex]?.[curTicketImageIndex]?.nft_details?.content_type === 'pdf'
    ? (
      <View>
        <Button
          onPress={() => sharePdf(event.event_id, getTicketNftImagePath(
            event.event_id,
            ticketTypeFiles[curTicketTypeIndex][curTicketImageIndex].ref_name,
          ))}
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
          source={{
            uri: getTicketNftImagePath(
              event.event_id,
              ticketTypeFiles[curTicketTypeIndex][curTicketImageIndex].ref_name,
            ),
          }}
          style={classes.ticketImage(ticketImageRatio)}
        />
        <View style={classes.buttonsContainer(ticketType)}>
          {!ticketType && (
            <Button
              onPress={() => setIsVisibleTicketType(true)}
              buttonStyle={{backgroundColor: '#272A32'}}
              style={{marginTop: 10}}
            >
              <Text h7 style={{color: 'white'}}>
                Choose ticket Type
              </Text>
            </Button>
          )}
          <Button
            onPress={() => setIsVisibleTicketImage(true)}
            buttonStyle={{backgroundColor: '#272A32'}}
            style={{marginTop: 10}}
          >
            <Text h7 style={{color: 'white'}}>
              Choose ticket image
            </Text>
          </Button>
        </View>
        {!ticketType && (
          <Dialog
            animationType='slide'
            visible={isVisibleTicketType}
            overlayStyle={classes.dialog}
          >
            <Picker
              selectedValue={curTicketTypeIndex}
              onValueChange={itemValue => {
                setCurTicketTypeIndex(itemValue)
                setCurTicketImageIndex(0)
              }}
              style={{width: '100%'}}
            >
              {event.ticket_types.map(({ticket_type_name}, index) => (
                <Picker.Item key={index} label={`${ticket_type_name}`} value={`${index}`} />
              ))}
            </Picker>
            <Button
              onPress={() => setIsVisibleTicketType(false)}
              buttonStyle={{backgroundColor: '#272A32'}}
              style={{marginTop: 10}}
            >
              <Text h7 style={{color: 'white'}}>
                Close
              </Text>
            </Button>
          </Dialog>
        )}
        <Dialog
          animationType='slide'
          visible={isVisibleTicketImage}
          overlayStyle={classes.dialog}
        >
          <Picker
            selectedValue={curTicketImageIndex}
            onValueChange={itemValue => setCurTicketImageIndex(itemValue)}
            style={{width: '100%'}}
          >
            {ticketTypeFiles[curTicketTypeIndex].map((cur, index) => (
              <Picker.Item key={index} label={`${cur.nft_details.nft_name}`} value={`${index}`} />))}
          </Picker>
          <Button
            onPress={() => setIsVisibleTicketImage(false)}
            buttonStyle={{backgroundColor: '#272A32'}}
            style={{marginTop: 10}}
          >
            <Text h7 style={{color: 'white'}}>
              Close
            </Text>
          </Button>
        </Dialog>
      </View>
    )

  return ticketTypeFiles.length > 0
    ? renderTicket()
    : <Skeleton style={classes.ticketImageSkeleton} />
}

export default TicketImage
