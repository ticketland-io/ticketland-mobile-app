import React, {useContext, useEffect, useState} from 'react'
import {View} from 'react-native'
import {Image, Skeleton, Text} from '@rneui/themed'
import userIcon from '../../../assets/userIcon.png'
import useStyles from './styles'
import ProgressBar from './ProgressBar';
import {ScrollView} from 'react-native'

const ScannedTickets = props => {
  const classes = useStyles()
  const {ticketsCount = []} = props
  const [totalTickets, setTotalTickets] = useState(0)
  const [totalScannedTickets, setTotalScannedTickets] = useState(0)

  useEffect(() => {
    const run = () => {
      const result = ticketsCount.reduce((acc, cur) => {
        acc.totalTickets += cur.total_count
        acc.totalScanned += cur.attended_count

        return acc
      }, {totalTickets: 0, totalScanned: 0})

      setTotalTickets(result.totalTickets)
      setTotalScannedTickets(result.totalScanned)
    }

    ticketsCount.length && run()
  }, [JSON.stringify(ticketsCount)])//using stringify for deep comparison with prev state

  const renderBars = () => ticketsCount.length > 0
    ? ticketsCount.map((ticketCount, index) => (
      <ProgressBar
        key={index}
        totalTickets={ticketCount.total_count}
        scannedTickets={ticketCount.attended_count}
        ticketName={ticketCount.name}
      />
    ))
    : [...new Array(4)].map((_, index) => (
      <ProgressBar key={index} />
    ))

  const renderData = () => (
    <View style={classes.scannedTicketsContainer}>
      <Text h5>Tickets scanned</Text>
      <ScrollView>
      {renderBars()}
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16
      }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={userIcon}
            style={classes.ticketIcon}
          />
          <Text h7>
            Total visitors:
          </Text>
        </View>
        {totalScannedTickets
          ? (
            <View style={{flexDirection: 'row'}}>
              <Text h7>
                {totalScannedTickets}
              </Text>
              <Text h7 style={{fontWeight: 600}}>
                / {totalTickets}
              </Text>
            </View>
          )
          : <Skeleton width={30} />}
      </View>
    </View>
  )

  return (
    <View style={{flex: 2}}>
      {renderData()}
    </View>
  )
}

export default ScannedTickets
