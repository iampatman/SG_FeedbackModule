import React from 'react'
import {
  View, Text, FlatList, Image,
  TouchableOpacity, NativeModules, Platform, Button, Alert
} from 'react-native'
import styles from './FormMenu.Style'
import {
  navigateToHistory, navigateToMovingForm,
} from '../../navigation/helpers/Nav.FormMenu.Helper'
import CONFIG from '../../utils/Config'
import { loadCategoryList } from '../../api/index'
import Loader from '../../components/loader/Loader'
import { ActionSheet, Icon } from 'antd-mobile'

const {ReactManager} = NativeModules

export default class FormMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Feedback',
    headerLeft: <TouchableOpacity onPress={() => {
      FormMenuScreen.goBackStaticFunc()
    }}>
      <Image source={require('../../assets/images/left-arrow.png')} style={{height: 20, width: 20, marginLeft: 10}}/>
    </TouchableOpacity>
  }

  static goBackStaticFunc = () => {
    if (CONFIG.rootTag != -1) {
      console.log('goBackToLifeUp app rootTag ' + CONFIG.rootTag)
      if (Platform.OS === 'ios') {
        ReactManager.dismissPresentedViewController(CONFIG.rootTag)
      } else {
        NativeModules.ActivityStarter.goback_LifeUp()
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
      const filteredData = data.filter(item => item.subcategory && item.subcategory.length > 0)
      this.setState({
        data: filteredData,
        loading: false
      })
    }).catch(error => {
      console.log(error)
      Alert.alert('Error', error, [
        {
          text: 'OK',
          onPress: () => {
            this.setState({
              loading: false
            }, FormMenuScreen.goBackStaticFunc)
          }
        }
      ], {cancelable: false})
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
        {/*<TouchableOpacity style={styles.historyContainer} onPress={this.onShowHistoryPressed}>*/}
        {/*<Text>Check Feedback History</Text>*/}
        {/*</TouchableOpacity>*/}
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