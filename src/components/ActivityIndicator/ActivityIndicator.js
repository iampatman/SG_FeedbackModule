import React from 'react'
import {
  ActivityIndicator
} from 'react-native'

export default class MyActivityIndicator extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      animating: props.animating ? props.animating : false,
      onStart: props.onStart ? props.onStart : null,
      onStop: props.onStop ? props.onStop : null
    }
  }

  start = () => {
    const {onStart} = this.state
    this.setState({
      animating: true
    }, () => {
      if (onStart) onStart()
    })
  }
  stop = () => {
    const {onStop} = this.state
    this.setState({
      animating: false
    }, () => {
      if (onStop) onStop()
    })
  }

  render () {
    const {animating} = this.state
    return (
      <ActivityIndicator animating={animating} hidesWhenStopped={true}/>
    )
  }
}