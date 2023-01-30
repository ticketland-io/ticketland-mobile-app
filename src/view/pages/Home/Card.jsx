import React, {useContext} from 'react'
import {View} from 'react-native'
import {Button, Image, Text} from '@rneui/themed'
import {Context} from '../../core/Store'
import Shadow from '../../components/Shadow'
import useStyles from './styles'
import UserIcon from '../../../assets/userIcon.png'
import CalendarIcon from '../../../assets/calendarIcon.png'
import {get_event_cover_image_path} from '../../../services/event'

const Card = props => {
  const [state] = useContext(Context)
  const {event, style = ''} = props
  const classes = useStyles()

  return (
    <View style={{flex: 1}}>
      <Shadow
        // alignSelf='center'
        style={[{width: 320, padding: 8}, style]}
        styleInner={{borderRadius: 0}}
      >
        <View justifyContent='center'>
          <Image source={{uri: get_event_cover_image_path(event?.event_id, event?.file_type)}} style={{width: '100%', height: 212, aspectRatio: 1, borderRadius: 14}} />
        </View>
        <Text h6 style={{marginVertical: 8, paddingHorizontal: 8}}>
          Music Event Name
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={CalendarIcon}
              style={{width: 14, height: 14, marginRight: 6}}
            />
            <Text h7 style={{fontWeight: 600}}>
              Date
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Button
              buttonStyle={{width: 74, height: 34, backgroundColor: 'yellow', padding: 8}}
            >
              <Image
                source={UserIcon}
                style={{width: 14, height: 14, marginRight: 6}}
              />
              <Text h6>2600</Text>
            </Button>
          </View>
        </View>
      </Shadow>
    </View>
  )
}

export default Card
