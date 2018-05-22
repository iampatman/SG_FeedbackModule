import React from 'react'
import {
  View,
  Text,
  SectionList, ScrollView,
  Alert, NativeModules, Platform, Button, FlatList, Image
} from 'react-native'

import { Button as ANTButton } from 'antd-mobile'
import styles from './FormDetail.Style'
import { loadFormDetail, submitRating } from '../../api/index'
import {
  extractFeedbackData,
} from './FormDetail.ExtractData'
import Loader from '../../components/loader/Loader'
import Messages from '../../components/messages/Messages'
import CONFIG from '../../utils/Config'
import StarRating from 'react-native-star-rating'

const {ReactManager} = NativeModules

export default class FormDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    const {params} = this.props.navigation.state || {}
    console.log('FormDetailScreen Params ' + JSON.stringify(params))
    this.id = CONFIG.id
    if (params != null) {
      this.id = params.id
    }

    this.state = {
      id: this.id,
      data: [],
      rawData: null,
      images: [],
      messages: [],
      message: [],
      loading: true,
      rating: 0,
      ratingLoading: false
    }
    console.log('State: ' + JSON.stringify(this.state))
  }

  static navigationOptions = ({navigation}) => {
    if (CONFIG.id != 0) {
      return {
        title: 'Form Detail',
        headerLeft: <Button title={'Back'} onPress={() => {
          FormDetailScreen.goBackStaticFunc()
        }}></Button>
      }
    } else {
      return null
    }

  }

  static goBackStaticFunc = () => {
    if (CONFIG.rootTag != -1) {
      console.log('goBackToLifeUp app rootTag ' + CONFIG.rootTag)
      if (Platform.OS === 'ios') {
        ReactManager.dismissPresentedViewController(CONFIG.rootTag)
      } else {
        NativeModules.QRActivityStarter.goback_LifeUp()
      }

    }
  }

  renderItem = ({item, index, section}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitleText} key={index}>{item.key}</Text>
        </View>
        <View style={styles.itemDetailContainer}>
          <Text key={index}>{item.value}</Text>
        </View>
      </View>
    )
  }

  componentDidMount () {
    this.loadData()
  }

  setLoading = (value) => {
    this.setState({
      loading: value
    })
  }
  loadData = () => {
    const {id} = this.state
    loadFormDetail(id).then((data) => {
      // console.log('data: ' + JSON.stringify(data))
      var extractedData = extractFeedbackData(data)
      this.setState({
        rawData: data,
        message: data.message,
        images: data.feedback_information.imageurls,
        data: extractedData,
        loading: false
      })
    }).catch((error) => {
      this.setLoading(false)
      // Alert.alert('Error', error)
      console.log(error)
    })
  }

  sendRating = () => {
    const {rating, id} = this.state
    console.log('Send Rating')
    this.setState({
      ratingLoading: true
    })
    submitRating({id, rating}).then(data => {
      this.setState({
        ratingLoading: false
      })
      Alert.alert('', 'Thank you for your feedback')
    }).catch((error) => {
      this.setLoading(false)
      // Alert.alert('Error', error)
      console.log(error)
    })
  }

  renderRating = () => {

    const ratingDisabled = false

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <StarRating
          disabled={ratingDisabled}
          maxStars={5}
          starSize={30}
          rating={this.state.rating}
          selectedStar={(rating) => this.setState({rating: parseInt(rating)})}
          fullStarColor={'blue'}
        />
        <ANTButton
          loading={this.state.ratingLoading}
          disabled={this.state.rating === 0}
          type={'primary'}
          onClick={this.sendRating}>
          <Text>Submit</Text>
        </ANTButton>


      </View>

    )
  }

  renderImages = () => {

    // const images = ['https://i2.wp.com/beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg']
    const images = this.state.images
    return (
      <FlatList data={images}
                renderItem={(item) => <Image source={{uri: item.item}} style={{width: 80, height: 80, margin: 5}}/>}
                horizontal={true}/>
    )
  }

  render () {
    const {id, data, message, loading, rawData} = this.state
    const status = rawData ? rawData.basic_information.status : ''
    console.log('rawData ' + JSON.stringify(rawData))
    console.log('Status ' + status)
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} text={'Loading'}/>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={({section: {title}}) => <Text style={styles.sectionText}>{title}</Text>}
          sections={data}
        />
        {this.renderImages()}
        {new Set(['sent', 'received', 'pending']).has(status) ?
          <Messages data={message} id={id}/> : this.renderRating()}
      </ScrollView>
    )
  }
}

