import React, { Component } from 'react'
import {
  View,
  WebView
} from 'react-native'
import styles from './WebView.Style'

class WebViewScreen extends Component<Props, State> {
  static navigationOptions = (navigation: Object) => {
    const {params} = navigation.navigation.state
    return {}
  }

  constructor (props: Props) {
    super(props)
    const {params} = this.props.navigation.state
    this.state = {
      url: params.url
    }
  }

  render () {
    const {url} = this.state
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={true}
          scalesPageToFit={true}
          source={{uri: url}}
        />
      </View>
    )
  }

}

export default WebViewScreen
