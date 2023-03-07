import React, {useContext, useEffect} from 'react'
import {Modal, SafeAreaView, View, Dimensions} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import {useState} from 'react';
import {verifyTicketService as verifyTicket} from '../../../services/verify-ticket';
import {normalizeEventId, fetchTicket} from '../../../services/ticket';
import {Button, Image, Text} from '@rneui/themed';
import AntIcon from "react-native-vector-icons/AntDesign";
import {Dialog} from '@rneui/themed';
import SuccessIcon from '../../../assets/checkbox-circle-line.png'
import ErrorIcon from '../../../assets/alert-fill.png'
import Icon from "react-native-vector-icons/Ionicons";
import {Context} from '../../core/Store';
import {qrCodeKeysCompare} from '../../../helpers/string';

const Scanner = props => {
  const [state] = useContext(Context)
  const [scanned, setScanned] = useState(false)
  const [ticketInfo, setTicketInfo] = useState({})
  const [dialogVisible, setDialogVisible] = useState(false)
  const [qrCodeData, setQrCodeData] = useState()
  const [error, setError] = useState()
  const [ref, setRef] = useState()
  const [loading, setLoading] = useState(false)
  const [verification, setVerification] = useState(false)
  const {
    modalVisible,
    setModalVisible,
    eventId,
    setTicketsCount,
    ticketsCount = []
  } = props

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency
  const rectDimensions = SCREEN_WIDTH * 0.8; // this is equivalent to 255 from a 393 device width
  const rectDimensionsHeight = SCREEN_HEIGHT * 0.45; // this is equivalent to 255 from a 393 device width
  const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width

  const styles = StyleSheet.create({
    centerText: {
      // flex: 1,
      fontSize: 18,
      // padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonTouchable: {
      padding: 16
    }
  });

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
      // const result = await verifyTicket(
      //   normalizeEventId(eventId),
      //   '',
      //   qrCodeData.ticketMetadata,
      //   qrCodeData.ticketNft,
      //   qrCodeData.ticketOwnerPubkey,
      //   qrCodeData.sig
      // )

      // console.log(result)
  
      let newVal = ticketsCount
      newVal[ticketInfo?.ticket_type_index].attended_count += 1
      setTicketsCount(newVal)
      setVerification(true)
    } catch (error) {
      setError(error)
      //ignore
    }

    // await new Promise(_ => setTimeout(_, 1000));
    setLoading(false)
  }

  const isExpired = expTimestamp => {
    if (Date.now() >= expTimestamp) {
      throw new Error('QR code expired')
    }
  }

  const checkEventId = data => {
    if (eventId !== data.eventId) {
      throw new Error('Wrong eventId')
    }
  }

  const checkQrData = data => {
    qrCodeKeysCompare(Object.keys(data))
    isExpired(data.expTimestamp)
    checkEventId(data)
  }

  const onSuccess = async e => {
    try {
      // await new Promise(_ => setTimeout(_, 500));
      // setScanned(false)
      setScanned(true)

      const data = JSON.parse(e.data)

      checkQrData(data)
      setQrCodeData(data)
      // setModalVisible(false)
      // console.log(ref.reactivate())
    } catch (error) {
      console.log(error)
      setError(error)
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
      setError(false)
      ref.reactivate()
    }
  }

  const renderDialog = () => (
    <Dialog
      isVisible={dialogVisible}
      overlayStyle={{position: 'absolute', width: '90%', bottom: 50, borderRadius: 16, borderWidth: 2, borderColor: 'yellow', padding: 24}}

    >
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2, justifyContent: 'center'}}>
          {error
            ? <Image source={ErrorIcon} style={{height: 28}} />
            : <Image source={SuccessIcon} style={{height: 26}} />
          }
        </View>
        {error
          ? (
            <View style={{flex: 10}}>
              <Dialog.Title titleProps={`h6`} title={'SCAN ERROR!'} />
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{typeof (error) != typeof ('') ? 'Code not scanned' : error}</Text>
              </View>
            </View>
          )
          : (
            <View style={{flex: 10}}>
              <Dialog.Title title={'TICKET SCANNED'} />
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{ticketsCount[ticketInfo?.ticket_type_index]?.name}</Text>
                <Text>#{ticketInfo.seat_name}</Text>
              </View>
            </View>
          )
        }
      </View>
      <Button
        loading={loading}
        buttonStyle={{backgroundColor: '#272A32', marginTop: 24}}
        onPress={dialogButtonAction}
      >
        <Text style={{color: 'white'}}>
          {renderDialogButtonText()}
        </Text>
      </Button>
    </Dialog>
  )

  const renderCustomMarker = () => (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent"
    }}>
      <View style={{
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text title style={{color: "white"}}>
          SCAN QR CODE
        </Text>
        <Text h7 style={{color: "white", marginTop: 24}}>
          Align QR code with the frame to scan
        </Text>
      </View>
      <View style={{flexDirection: "row"}}>
        <View style={{
          height: rectDimensionsHeight,
          width: SCREEN_WIDTH,
          backgroundColor: overlayColor,
        }} />

        <View style={{
          height: rectDimensionsHeight,
          width: rectDimensions,
          borderWidth: rectBorderWidth,
          // borderColor: rectBorderColor,
          borderColor: `${scanned ? error ? 'red' : 'yellow' : '#D9D9D9'}`,
          // borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent"
        }} />
        <View style={{
          height: rectDimensionsHeight,
          width: SCREEN_WIDTH,
          backgroundColor: overlayColor
        }} />
      </View>
      <View style={{
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: overlayColor,
        justifyContent: 'flex-end',
        alignItems: "center",
        // paddingBottom: SCREEN_WIDTH * 0.25
      }}>
        <Button
          containerStyle={{width: rectDimensions}}
          buttonStyle={[
            styles.buttonTouchable,
            {
              marginBottom: SCREEN_WIDTH * 0.15,
              backgroundColor: '#F2F2F3',
              padding: 12
            }
          ]}
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
