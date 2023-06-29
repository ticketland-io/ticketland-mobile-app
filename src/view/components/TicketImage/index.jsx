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
import {getEventTicketImagePath} from '../../../services/event'
import useStyles from './styles'

const TicketImage = props => {
  const {event, ticketType = ''} = props
  const [ticketImage, setTicketImage] = useState([])
  const [ticketFiles, setTicketFiles] = useState([])
  const [ticketImageRatio, setTicketImageRatio] = useState()
  const [loading, setLoading] = useState(true)
  const [ticketTypes, setTicketTypes] = useState([])
  const [ticketFileNames, setTicketFileNames] = useState([])
  const [isVisibleTicketType, setIsVisibleTicketType] = useState(false)
  const [isVisibleTicketImage, setIsVisibleTicketImage] = useState(false)
  const [curTicketTypeIndex, setCurTicketTypeIndex] = useState(0)
  const [curTicketImageIndex, setCurTicketImageIndex] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    const run = () => {
      setLoading(true)

      try {
        const types = event.ticketTypes.reduce((acc, cur) => [...acc, cur.label], [])
        const ticketFilesResult = event.ticketTypes.reduce((acc, cur) => [...acc, cur.ticketFiles], [])

        setTicketTypes([...types])
        setTicketFiles(ticketFilesResult)
      } catch (error) {
        // ignore
      }

      setLoading(false)
    }

    event?.event_id && run()
  }, [event?.event_id])

  useEffect(() => {
    const run = () => {
      setTicketImage(ticketFiles[curTicketTypeIndex][curTicketImageIndex])

      const names = ticketFiles[curTicketTypeIndex].map(cur => cur.name)

      setTicketFileNames(names)
      Image.getSize(ticketFiles[curTicketTypeIndex][curTicketImageIndex].url, (width, height) => setTicketImageRatio(width / height))
    }

    ticketFiles.length && run()
  }, [curTicketTypeIndex, curTicketImageIndex, ticketFiles])

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
          source={{uri: ticketImage.url}}
          style={classes.ticketImage(ticketImageRatio)}
        />
        <View style={classes.buttonsContainer(ticketType.length)}>
          {ticketType.length === 0 && (
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
        {ticketType.length === 0 && (
        <Dialog
          animationType='slide'
          visible={isVisibleTicketType}
          overlayStyle={classes.dialog}
        >
          <Picker
            selectedValue={curTicketTypeIndex}
            onValueChange={(itemValue, itemIndex) => setCurTicketTypeIndex(itemValue)}
            style={{width: '100%'}}
          >
            {ticketTypes.map((cur, index) => <Picker.Item key={index} label={`${cur}`} value={`${index}`} />)}
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
            onValueChange={(itemValue, itemIndex) => setCurTicketImageIndex(itemValue)}
            style={{width: '100%'}}
          >
            {ticketFileNames.map((cur, index) => <Picker.Item key={index} label={`${cur}`} value={`${index}`} />)}
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

  return !loading
    ? renderTicket()
    : <Skeleton style={classes.ticketImageSkeleton} />
}

export default TicketImage
