import React from 'react'
import {
  View,
  Text,
  FlatList, SectionList, ScrollView, Alert, NativeModules, Platform, Button
} from 'react-native'
import styles from './FormDetail.Style'
import { loadFormDetail } from '../../api/index'
import {
  extractMovingData, extractOtherInformation, extractRefundData, extractRenovationData, extractRentalData,
  extractVehicleData
} from './FormDetail.ExtractData'
import Loader from '../../components/loader/Loader'
import Messages from '../../components/messages/Messages'
import CONFIG from '../../utils/Config'

const {ReactManager} = NativeModules

export default class FormDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    const {params} = this.props.navigation.state || {}
    console.log('FormDetailScreen Params ' + JSON.stringify(params))
    this.formId = CONFIG.formid
    this.formType = CONFIG.formtype
    if (params != null) {
      this.formId = params.formId
      this.formType = params.formType
    }

    this.state = {
      formId: this.formId,
      formType: this.formType,
      data: [],
      message: [],
      loading: true
    }
    console.log('State: ' + JSON.stringify(this.state))
  }

  static navigationOptions = ({navigation}) => {
    if (CONFIG.formid != 0 && CONFIG.formtype != 0) {
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
    const {formId, formType} = this.state
    loadFormDetail({formId, formType}).then((data) => {
      // console.log('data: ' + JSON.stringify(data))
      var extractedData = []
      switch (this.state.formType) {
        case 1:
          extractedData = extractMovingData(data)
          break
        case 2:
          extractedData = extractRentalData(data)
          break
        case 3:
          extractedData = extractRenovationData(data)
          break
        case 4:
          extractedData = extractVehicleData(data)
          break
        case 5:
          extractedData = extractRefundData(data)
          break
      }

      const extractedOtherData = extractOtherInformation(data)
      if (extractedOtherData)
        extractedData.push(extractedOtherData)

      this.setState({
        message: data.message,
        data: extractedData,
        loading: false
      })
    }).catch((error) => {
      this.setLoading(false)
      // Alert.alert('Error', error)
      console.log(error)
    })
  }

  render () {
    const {data, message, loading, formId, formType} = this.state
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} text={'Loading'}/>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={({section: {title}}) => <Text style={styles.sectionText}>{title}</Text>}
          sections={data}
        />
        <Messages data={message} formId={formId} formType={formType}/>
      </ScrollView>
    )
  }
}