import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView, Alert, TouchableOpacity, Image } from 'react-native'
import styles from './MovingForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import Loader from '../../components/loader/Loader'
import { submitForm, DATA_TYPE, loadData } from '../../api/index'
import moment from 'moment'
import Images from '../../assets/Images'
import RNFetchBlob from 'react-native-fetch-blob'
import showUploadFileActionSheet, { SELECTED_TYPE } from '../../components/uploader/Uploader'
import * as ImagePicker from 'react-native-image-picker'

const SELECTED_SEC_DOCUMENT = {
  SEC_47: 1,
  SEC_65: 2
}

export default class MovingFormScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state

    return {
      title: params.title
    }
  }

  constructor (props) {
    super(props)
    const {params} = this.props.navigation.state || {}

    this.data = {
      category_id: params.catId,
      subcategory_id: params.subCatId,
      description: '',
      image: ''
    }

    this.state = {
      title: params.title,
      images: [],
      loading: false,
      description: '',
      loadingText: 'Loading',
    }
  }

  componentDidMount () {
    const {title} = this.state
    this.props.navigation.setParams({
      title
    })
  }

  setLoading = (loading, loadingText) => {
    this.setState({
      loading, loadingText
    })
  }

  submitFormData = (data) => {
    const {navigation} = this.props
    console.log('Data submitForm' + data)
    this.setLoading(true, 'Submitting')
    submitForm(data).then((result) => {
      this.setLoading(false)
      navigateToThankyou(navigation)
    }).catch((errorMsg) => {
      Alert.alert('Error', errorMsg, [{
        text: 'OK', onPress: () => {
          this.setLoading(false)
        }
      }], {cancelable: false})
    })
  }

  validateForm = () => {
    const {description} = this.state
    this.data.description = description
    if (description == '') {
      Alert.alert('Notice', 'Please fill all the fields')
      return false
    } else {
      return true
    }
  }

  onSubmitPressed = () => {
    if (this.validateForm() == false) {
      return
    }
    console.log('Data onSubmitPressed' + JSON.stringify(this.data))
    this.submitFormData(this.data)
  }

  renderImages = () => {

    const {images} = this.state
    var imagesArr = [...images]
    if (imagesArr.length < 3)
      imagesArr.push(null)
    return imagesArr.map((image, index) => renderImageSelector(image, (photo) => {
      imagesArr[index] = photo
      this.setState({
        images: imagesArr
      })
    }))
  }

  render () {
    const {
      description, loading, loadingText
    } = this.state

    return (
      <View style={styles.container}>
        <Loader loading={loading} text={loadingText}/>
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>

          <TextInput style={styles.input} multiline={true} maxLength={200} placeholder={'Description'}
                     value={description}
                     onChangeText={(description) => this.setState({description})}/>

          <View style={{flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10}}>
            {this.renderImages()}
          </View>
        </ScrollView>
        <Button type={'primary'} style={styles.submitBtn} onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}

const renderImageSelector = (image, onPhotoSelected) => {
  // console.log('Image ' + JSON.stringify(image))
  const onPress = () => {
    const options = {
      title: 'Select Photo',
      chooseFromLibraryButtonTitle: 'Camera Roll',
      takePhotoButtonTitle: 'Take Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        // let source = {uri: `data:image/jpeg;base64,${response.data}`}
        let source = {uri: response.uri}
        onPhotoSelected(source)
      }
    })
  }

  if (image === null) {
    return (
      <TouchableOpacity style={styles.selectImageContainer} onPress={onPress}>
        <Text>
          Add Image
        </Text>
      </TouchableOpacity>
    )
  } else return (
    <TouchableOpacity style={styles.selectImageContainer} onPress={onPress}>
      <Image source={image} style={styles.image}/>
    </TouchableOpacity>
  )
}