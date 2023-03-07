import React, {useContext, useEffect} from 'react'
import {SafeAreaView, View} from 'react-native'
import AntIcon from "react-native-vector-icons/AntDesign";
import {Button, Image, Skeleton, Text} from '@rneui/themed'
import {Context} from '../../core/Store'
import Shadow from '../../components/Shadow'
import TicketIcon from '../../../assets/ticket.png'
import CheckBox from '../../../assets/checkbox-circle-fill.png'
import useStyles from './styles'

const ProgressBar = props => {
  const classes = useStyles()
  const {totalTickets, scannedTickets, ticketName} = props

  const calculateWidthPercentage = () => scannedTickets * 100 / totalTickets

  return totalTickets
  ?(
    <View style={{flexDirection: 'row', borderRadius: 8, overflow: 'hidden', position: 'relative', marginTop: 8}}>
      <View style={{backgroundColor: '#FFED00', height: 40, width: `${calculateWidthPercentage()}%`}} />
      <View style={{backgroundColor: '#F2F2F3', height: 40, width: `${100 - calculateWidthPercentage()}%`}} />
      <View style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
      }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={TicketIcon}
            style={classes.ticketIcon}
          />
          <Text h7 style={{}}>
            {ticketName}
          </Text>
        </View>
        <View>
          {
            scannedTickets == totalTickets
              ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={CheckBox}
                  style={classes.checkBoxIcon}
                />
                <Text style={{}}>
                  {scannedTickets}
                </Text>
              </View>
               
              )
              : (
                <Text style={{}}>
                  {scannedTickets} / {totalTickets}
                </Text>
              )
          }
        </View>
      </View>
    </View>
  ):<Skeleton width={'100%'} height={40} style={{borderRadius: 8,marginTop: 8}}/>
}

export default ProgressBar
