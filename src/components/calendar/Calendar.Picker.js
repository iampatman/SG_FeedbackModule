import React from 'react'
import {
  View,
  Modal,
  Text
} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { styles } from './Calendar.Picker.Style'

const CalendarPicker = props => {
  const {
    onChange, title, visible
  } = props
  return (
    <Modal
      visible={visible}
      transparent
      animationType={'slide'}>
      <View style={styles.modalBackground}>
        <View
          style={styles.topContainer}/>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Calendar
          style={styles.calendarContainer}
          minDate={'1940-01-01'}
          onDayPress={(date) => {
            let value = new Date(date.timestamp)
            console.log('onDayPress: ' + value)
            onChange(value)
          }}
          monthFormat={'MM/yyyy'}
          onMonthChange={(month) => {
            console.log('month changed', month)
          }}
          hideExtraDays
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          theme={{
            textMonthFontSize: 20
          }}
        />
      </View>
    </Modal>
  )
}

export default CalendarPicker
