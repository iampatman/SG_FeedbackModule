import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView, Image } from 'react-native'
import styles from './Thankyou.Style'

import { Button } from 'antd-mobile'
import { resetToHome } from '../../navigation/helpers/Nav.FormMenu.Helper'

export default class ThankyouScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  onBackHomePressed = () => {
    const {navigation} = this.props
    resetToHome(navigation)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/submission-done.png')} />
          <Text style={styles.thankyou_text}>THANK YOU</Text>
          <Text style={styles.description_text}>Your submission is being processed, you can track your order status in CASE Memu</Text>
          <Button style={styles.submitBtn} onClick={this.onBackHomePressed}>
            <Text style={styles.submitText}>BACK HOME</Text>
          </Button>
      </View>
    )
  }
}