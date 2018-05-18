import React from 'react'
import {
  View, Text, FlatList, Image,
  TouchableOpacity, NativeModules, Platform, Button, Alert
} from 'react-native'
import styles from './FormMenu.Style'
import listData from './FormMenu.Form'
import {
  navigateToHistory, navigateToMovingForm, navigateToRefundForm, navigateToRenovationForm,
  navigateToRentalForm, navigateToVehicleForm
} from '../../navigation/helpers/Nav.FormMenu.Helper'
import CONFIG from '../../utils/Config'
import { loadCategoryList } from '../../api/index'

const {ReactManager} = NativeModules

export default class FormMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Feedback',
    headerLeft: <Button title={'Back'} onPress={() => {
      FormMenuScreen.goBackStaticFunc()
    }}></Button>
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

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount = () => {
    this.loadData()
  }

  loadData = () => {
    loadCategoryList().then((data) => {
      this.setState({
        data,
        loading: false
      })
    }).catch(error => {
      console.log(error)
      Alert.alert('Error', error)
    })
  }

  onMenuSelected = (id) => {
    const {navigation} = this.props
    switch (id) {
      case 1:
        navigateToMovingForm(navigation)
        return
      case 2:
        navigateToRentalForm(navigation)
        return
      case 3:
        navigateToRenovationForm(navigation)
        return
      case 4:
        navigateToVehicleForm(navigation)
        return
      case 5:
        navigateToRefundForm(navigation)
        return
    }
  }

  onShowHistoryPressed = () => {
    const {navigation} = this.props
    navigateToHistory(navigation)
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.onMenuSelected(item.id)}>
        <Image source={{uri: item.icon_url}} style={styles.iconImage}/>
        <Text style={styles.menuTitleText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    const {loading, data} = this.state
    return (
      <View style={styles.container}>
        <Loader loading={loading} text={'Loading'}/>
        <TouchableOpacity style={styles.historyContainer} onPress={this.onShowHistoryPressed}>
          <Text>Check Submission History</Text>
        </TouchableOpacity>
        <FlatList data={data}
                  renderItem={(item) => this.renderItem(item.item)}
                  numColumns={3}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}