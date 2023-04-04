import React, {useEffect, useState} from 'react'
import {View, ScrollView} from 'react-native'
import {Image, Skeleton, Text} from '@rneui/themed'
import userIcon from '../../../assets/userIcon.png'
import ProgressBar from './ProgressBar';
import useStyles from './styles'

const ScannedTickets = props => {
  const classes = useStyles()
  const {loading = false, ticketsCount = []} = props
  const [totalTickets, setTotalTickets] = useState(0)
  const [totalScannedTickets, setTotalScannedTickets] = useState(0)

  useEffect(() => {
    const result = ticketsCount.reduce((acc, cur) => {
      acc.totalTickets += cur.total_count
      acc.totalScanned += cur.attended_count

      return acc
    }, {totalTickets: 0, totalScanned: 0})

    setTotalTickets(result.totalTickets)
    setTotalScannedTickets(result.totalScanned)
  }, [JSON.stringify(ticketsCount)])// Using stringify for deep comparison with prev state

  const renderBars = () => !loading
    ? ticketsCount.map((ticketCount, index) => (
      <ProgressBar
        key={index}
        loading={loading}
        totalTickets={ticketCount.total_count}
        scannedTickets={ticketCount.attended_count}
        ticketName={ticketCount.name}
      />
    ))
    : [...new Array(4)].map((_, index) => (
      <ProgressBar loading={loading} key={index} />
    ))

  const renderData = () => (
    <View style={classes.scannedTicketsContainer}>
      <Text h5>Tickets scanned</Text>
      <ScrollView>
        {renderBars()}
      </ScrollView>
      <View style={classes.scannedTicketsInnerContainer}>
        <View style={classes.totalVisitorsItem}>
          <Image
            source={userIcon}
            style={classes.ticketIcon}
          />
          <Text h7>
            Total visitors:
          </Text>
        </View>
        {!loading
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
