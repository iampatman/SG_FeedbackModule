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
    this.state = {
      newmsg: '',
      refreshing: false,
      id: props.id,
      type: props.type,
      data: props.data,
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
    const {id} = this.state
    const param = {id, type: 6, message}
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
          <Text style={styles.itemTitleText}>{item.created_by}</Text>
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
        <Text style={styles.sectionText}>Messages</Text>
        {data.length > 0 ? <FlatList
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
                     maxLength={250}
                     onChangeText={(text) => this.setState({newmsg: text})}/>
          <Button disabled={this.state.newmsg == ''}
                  type={'primary'}
                  style={styles.submitBtn}
                  onClick={this.onSendMessagePressed}>
            <Text>Send</Text>
          </Button>
        </View>
      </View>
    )
  }
}