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
import Loader from '../../components/loader/Loader'
import { ActionSheet } from 'antd-mobile'

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

  onMenuSelected = (item) => {
    const {navigation} = this.props

    this.displaySubMenu(item, (selectedId, title) => {
      navigateToMovingForm(navigation, {
        catId: item.id,
        subCatId: selectedId,
        title: title
      })
    })
  }

  displaySubMenu = (item, onPress) => {
    const subCat = item.subcategory
    const options = [...subCat.map(cat => cat.name), 'Cancel']

    ActionSheet.showActionSheetWithOptions({
      options, cancelButtonIndex: options.length - 1, title: item.name
    }, (selectedIndex) => {
      console.log('Selected sub cat Index ' + selectedIndex)
      if (selectedIndex != options.length - 1 && onPress) {
        onPress(subCat[selectedIndex].id, subCat[selectedIndex].name)
      }
    })
  }

  onShowHistoryPressed = () => {
    const {navigation} = this.props
    navigateToHistory(navigation)
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.onMenuSelected(item)}>
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
          <Text>Check Feedback History</Text>
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