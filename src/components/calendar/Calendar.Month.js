import React, { Component } from 'react'
import { Calendar } from 'react-native-calendars'

export default class MonthCalendar extends Component {
  render () {
    return (
      <Calendar
        {...this.props}
      />
    )
  }
}
