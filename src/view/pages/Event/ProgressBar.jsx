import React from 'react'
import {View} from 'react-native'
import {Image, Skeleton, Text} from '@rneui/themed'
import TicketIcon from '../../../assets/ticket.png'
import CheckBox from '../../../assets/checkbox-circle-fill.png'
import useStyles from './styles'

const ProgressBar = props => {
  const classes = useStyles()
  const {
    totalTickets,
    scannedTickets,
    ticketName,
    loading = false
  } = props

  const percentage = scannedTickets * 100 / totalTickets

  return !loading
    ? (
      <View style={classes.progressBarContainer}>
        <View style={classes.yellowProgress(percentage)} />
        <View style={classes.grayProgress(percentage)} />
        <View style={classes.progressBarInfoContainer}>
          <View style={classes.progressBarTicketInfoItem}>
            <Image
              source={TicketIcon}
              style={classes.ticketIcon}
            />
            <Text h7>
              {ticketName}
            </Text>
          </View>
          <View>
            {
              scannedTickets == totalTickets && totalTickets != 0
                ? (
                  <View style={classes.successItem}>
                    <Image
                      source={CheckBox}
                      style={classes.checkBoxIcon}
                    />
                    <Text>
                      {scannedTickets}
                    </Text>
                  </View>
                )
                : (
                  <Text>
                    {scannedTickets} / {totalTickets}
                  </Text>
                )
            }
          </View>
        </View>
      </View>
    ) : <Skeleton style={classes.progressBarSkeletonContainer} />
}

export default ProgressBar
