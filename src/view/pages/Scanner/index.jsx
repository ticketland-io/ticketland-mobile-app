import React, {useContext, useEffect, useState} from 'react'
import {Modal, View} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Button, Image, Text, Dialog} from '@rneui/themed';
import {Context} from '../../core/Store';
import {verifyTicketService as verifyTicket} from '../../../services/verify-ticket';
import {normalizeEventId, fetchTicket} from '../../../services/ticket';
import SuccessIcon from '../../../assets/checkbox-circle-line.png'
import ErrorIcon from '../../../assets/alert-fill.png'
import {qrCodeKeysCompare} from '../../../helpers/string';
import useStyles from './styles'

const Scanner = props => {
  const {
    modalVisible,
    setModalVisible,
    eventId,
    setTicketsCount,
    ticketsCount = []
  } = props
  const [state] = useContext(Context)
  const [scanned, setScanned] = useState(false)
  const [ticketInfo, setTicketInfo] = useState({})
  const [dialogVisible, setDialogVisible] = useState(false)
  const [qrCodeData, setQrCodeData] = useState()
  const [error, setError] = useState()
  const [ref, setRef] = useState()
  const [loading, setLoading] = useState(false)
  const [verification, setVerification] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const run = async () => {
      try {
        const result = await fetchTicket(state.firebase, qrCodeData?.ticketNft)

        setTicketInfo(result)

        if (result.attended) {
          setError('Ticket already scanned')
        }
      } catch (e) {
        setError('Ticket not found')
      }

      setDialogVisible(true)
    }

    !error && scanned && qrCodeData && run()
  }, [qrCodeData, scanned])


  const verify = async () => {
    setLoading(true)

    try {
      const result = await verifyTicket(
        normalizeEventId(eventId),
        '',
        qrCodeData.ticketMetadata,
        qrCodeData.ticketNft,
        qrCodeData.ticketOwnerPubkey,
        qrCodeData.sig
      )

      let newVal = ticketsCount
      newVal[ticketInfo?.ticket_type_index].attended_count += 1
      setTicketsCount(newVal)
      setVerification(true)
    } catch (error) {
      setError('Code not scanned')
    }

    setLoading(false)
  }

  const isExpired = expTimestamp => {
    if (Date.now() >= expTimestamp) {
      throw new Error('QR code expired')
    }
  }

  const checkEventId = data => {
    if (eventId !== data.eventId) {
      throw new Error('Ticket is not from selected event')
    }
  }

  const checkQrData = data => {
    qrCodeKeysCompare(Object.keys(data))
    isExpired(data.expTimestamp)
    checkEventId(data)
  }

  const onSuccess = async e => {
    try {
      setScanned(true)

      const data = JSON.parse(e.data)

      checkQrData(data)
      setQrCodeData(data)
    } catch (error) {
      setError('Wrong ticket format')
      setDialogVisible(true)
    }
  };

  const renderDialogButtonText = () => {
    if (!error && qrCodeData && !verification) {
      return 'Verify'
    } else if (!error && qrCodeData && verification) {
      return 'Awesome!'
    } else {
      return 'Try again'
    }
  }

  const dialogButtonAction = () => {
    if (!error && qrCodeData && verification) {
      setVerification(false)
      setScanned(false)
      setDialogVisible(false)
      setModalVisible(false)
    } else if (!error && qrCodeData && !verification) {
      verify()
    } else {
      setScanned(false)
      setDialogVisible(false)
      setError('Code not scanned')
      ref.reactivate()
    }
  }

  const renderDialogIcon = () => (
    <View style={classes.errorIconItem}>
      {error
        ? <Image source={ErrorIcon} style={{height: 28}} />
        : <Image source={SuccessIcon} style={{height: 26}} />
      }
    </View>
  )

  const renderDialogMessage = () => error
    ? (
      <View style={{flex: 10}}>
        <Dialog.Title titleProps={`h6`} title={'SCAN ERROR!'} />
        <View style={classes.dialogTextItem}>
          <Text>{error}</Text>
        </View>
      </View>
    )
    : (
      <View style={{flex: 10}}>
        <Dialog.Title title={'TICKET SCANNED'} />
        <View style={classes.dialogTextItem}>
          <Text>{ticketsCount[ticketInfo?.ticket_type_index]?.name}</Text>
          <Text>#{ticketInfo.seat_name}</Text>
        </View>
      </View>
    )


  const renderDialog = () => (
    <Dialog
      isVisible={dialogVisible}
      overlayStyle={classes.dialog}
    >
      <View style={{flexDirection: 'row'}}>
        {renderDialogIcon()}
        {renderDialogMessage()}
      </View>
      <Button
        loading={loading}
        buttonStyle={classes.dialogButton}
        onPress={dialogButtonAction}
      >
        <Text style={{color: 'white'}}>
          {renderDialogButtonText()}
        </Text>
      </Button>
    </Dialog>
  )

  const renderCustomMarker = () => (
    <View style={classes.markerContainer}>
      <View style={classes.markerHeader}>
        <Text title style={{color: "white"}}>
          SCAN QR CODE
        </Text>
        <Text h7 style={classes.markerHeaderSubText}>
          Align QR code with the frame to scan
        </Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <View style={classes.markerLeftOuterSide} />
        <View style={classes.markerCenter(scanned, error)} />
        <View style={classes.markerRightOuterSide} />
      </View>
      <View style={classes.buttonContainer}>
        <Button
          containerStyle={classes.cancelButtonContainerStyle}
          buttonStyle={classes.cancelButton}
          onPress={() => setModalVisible(false)}>
          <Text h7>Cancel scanning</Text>
        </Button>
      </View>
    </View>
  )

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
    >
      {renderDialog()}
      <QRCodeScanner
        onRead={onSuccess}
        cameraStyle={{height: '100%'}}
        showMarker
        ref={(node) => {setRef(node)}}
        customMarker={renderCustomMarker()}
      />
    </Modal>
  )
}

export default Scanner
