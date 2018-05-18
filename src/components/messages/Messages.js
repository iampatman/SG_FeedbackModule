import React from 'react'
import {
  View,
  Text,
  FlatList,
  SectionList,
  TextInput, Alert
} from 'react-native'
import styles from './Messages.Style'
import { Button } from 'antd-mobile'
import { sendMessageQuery } from '../../api/index'

export default class Messages extends React.Component {
  constructor (props) {
    super(props)
    console.log('messages props' + JSON.stringify(props))
    // const {params} = this.props.navigation.state
    this.state = {
      formId: props.formId,
      formType: props.formType,
      newmsg: '',
      refreshing: false,
      data: props.data,
      // onSend: params.onSend
    }
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({
      data: newProps.data
    })
  }

  setReloading = (refreshing) => {
    this.setState({
      refreshing
    })
  }

  sendMessage = (message) => {
    const {formId, formType} = this.state
    const param = {id: formId, formtype: formType, message}
    this.setReloading(true)

    sendMessageQuery(param).then((data) => {
      this.setReloading(false)
      this.setState({
        data: data,
        newmsg: ''
      })
    }).catch(error => {
      this.setReloading(false)
      Alert.alert('Error', error)
    })
  }

  onSendMessagePressed = () => {
    this.sendMessage(this.state.newmsg)
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitleText}>{item.create_by}</Text>
        </View>
        <View style={styles.itemDetailContainer}>
          <Text>{item.detail}</Text>
          <Text style={styles.timeTagText}>{item.created_time}</Text>
        </View>
      </View>
    )
  }

  render () {
    const {data, refreshing} = this.state
    console.log('messages data' + JSON.stringify(data))
    return (
      <View style={styles.container}>
        {data.length > 0 ?
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {}}
        /> : <Text>No Messages</Text>}
        <View style={styles.sendMsgContainer}>
          <TextInput style={styles.messageInput}
                     placeholder={'Type your message here'}
                     value={this.state.newmsg}
                     onChangeText={(text) => this.setState({newmsg: text})}/>
          <Button disabled={this.state.newmsg == ''}
                  type={'primary'}
                  style={styles.submitBtn}
                  onClick={this.onSendMessagePressed}>Send</Button>
        </View>
      </View>
    )
  }
}