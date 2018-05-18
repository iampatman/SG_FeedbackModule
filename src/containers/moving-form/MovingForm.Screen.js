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

const SELECTED_SEC_DOCUMENT = {
  SEC_47: 1,
  SEC_65: 2
}

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }

  constructor (props) {
    super(props)
    this.data = {
      formtype: 1,
      type: '',
      moving_date: '',
      description: '',
      email: '',
      unit_no: '',
      engaging_contractor: {
        choose: false,
        mover_name: '',
        mover_address: '',
        mover_phno: '',
        mover_email: '',
        vehicle_type: ''
      },
      file_upload: []
    }

    this.file47 = null
    this.file65 = null

    this.state = {
      unit_no: '',
      email: '',
      showingCalendarPicker: false,
      showingMovingContractor: false,
      loading: true,
      loadingText: 'Loading',
      movingSituationData: [],
      selectedType: 1,
      uploadedPhoto47: Images.picture_frame_icon,
      selectedDocumentFileName47: '',
      uploadedPhoto65: Images.picture_frame_icon,
      selectedDocumentFileName65: ''
    }
  }

  loadData = () => {
    loadData(DATA_TYPE.MOVING).then((data) => {
      console.log('tdata ' + JSON.stringify(data))
      this.data.email = data.email
      this.data.unit_no = data.unit_no
      this.setState({
        movingSituationData: data.tdata,
        email: data.email,
        unit_no: data.unit_no,
        loading: false
      })
    }).catch()
  }

  componentDidMount () {
    this.loadData()
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
    const {type, moving_date} = this.data
    if (type == '' || moving_date == '') {
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
    if (this.file47) this.data.file_upload.push(this.file47)
    if (this.file65) this.data.file_upload.push(this.file65)

    console.log('Data onSubmitPressed' + JSON.stringify(this.data))
    this.submitFormData(this.data)
  }

  onCalendarChanged = (date: Date) => {
    let dateStr = date.toDateString()
    let formattedStr = moment(dateStr, 'ddd MMM DD YYYY').format('YYYY/MM/DD')
    console.log('CalendarPicker ' + formattedStr)
    this.refTenancyFrom.setNativeProps({text: formattedStr})
    this.data.moving_date = formattedStr
    this.setState({
      showingCalendarPicker: false,
    })
  }

  renderContractorForm = () => {
    if (this.state.showingMovingContractor) {
      return (
        <View>
          <TextInput style={styles.input} placeholder={'Mover Name'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_name = text}}/>
          <TextInput style={styles.input} placeholder={'Mover Address'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_address = text}}/>
          <TextInput style={styles.input} placeholder={'Mover Mobile Number'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_phno = text}}/>
          <TextInput style={styles.input} placeholder={'Mover Email'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_email = text}}/>
          <TextInput style={styles.input} placeholder={'Vehicle Type'}
                     onChangeText={(text) => {this.data.engaging_contractor.vehicle_type = text}}/>
        </View>
      )
    } else {
      return null
    }
  }

  onMovingSituationSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    const {movingSituationData} = this.state
    const selectedId = movingSituationData.filter((obj) => obj.name === text[0])[0].id
    this.setState({
      selectedType: selectedId
    })
    this.data.type = selectedId
    this.refMovingSituation.setNativeProps({text: text[0]})
  }

  uploadFile = (docType: SELECTED_SEC_DOCUMENT) => {
    this.data.file_upload = []
    var params = null
    var file = {}
    const onComplete = (fileType, response) => {
      switch (fileType) {
        case SELECTED_TYPE.DOCUMENT:
          RNFetchBlob.fs.readFile(response.uri, 'base64')
            .then((data) => {
              console.log(`fileName ${response.fileName} bdata length ${data.length}`)
              file = {name: response.fileName, bdata: data}
            })
          if (response != null) {
            params = {
              uploadedPhoto: Images.document_icon,
              selectedDocumentFileName: response.fileName
            }
          }
          break
        case SELECTED_TYPE.IMAGE:
          file = {name: response.fileName, bdata: response.data}
          params = {
            uploadedPhoto: {uri: response.uri},
          }
          break
      }
      if (params != null) {
        switch (docType) {
          case SELECTED_SEC_DOCUMENT.SEC_47:
            this.file47 = file
            this.setState({
              uploadedPhoto47: params.uploadedPhoto,
              selectedDocumentFileName47: params.selectedDocumentFileName
            })
            break
          case SELECTED_SEC_DOCUMENT.SEC_65:
            this.file65 = file
            this.setState({
              uploadedPhoto65: params.uploadedPhoto,
              selectedDocumentFileName65: params.selectedDocumentFileName
            })
            break
        }
      }

    }
    showUploadFileActionSheet({
      onComplete
    })
  }

  onEmailChange = (text) => {
    this.data.email = text
    this.setState({
      email: text
    })
  }

  render () {
    const {
      movingSituationData, email, unit_no,
      selectedType, loading, loadingText,
      uploadedPhoto47, selectedDocumentFileName47,
      uploadedPhoto65, selectedDocumentFileName65
    } = this.state

    return (
      <View style={styles.container}>
        <Loader loading={loading} text={loadingText}/>
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refMovingSituation = ref}
                     style={styles.input}
                     placeholder={'Moving Situation'}
                     onFocus={() => showPicker({
                       pickerData: movingSituationData.map((item) => item.name),
                       onPickerConfirm: this.onMovingSituationSelected
                     })}/>
          {selectedType === 3 ?
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Button style={{width: 140}} type={'ghost'}
                        onClick={() => this.uploadFile(SELECTED_SEC_DOCUMENT.SEC_47)}>Sec 47</Button>
                <Image source={uploadedPhoto47} style={{height: 50, width: 50}}/>
                <Text>{selectedDocumentFileName47}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Button style={{width: 140}} type={'ghost'}
                        onClick={() => this.uploadFile(SELECTED_SEC_DOCUMENT.SEC_65)}>Sec 65</Button>
                <Image source={uploadedPhoto65} style={{height: 50, width: 50}}/>
                <Text>{selectedDocumentFileName65}</Text>
              </View>
            </View> : null}

          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({showingCalendarPicker: true})}>
            <Text ref={ref => this.refTenancyFrom = ref}>
              {this.data.moving_date == '' ? 'Moving Date' : this.data.moving_date}
            </Text>
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder={'Unit'} value={unit_no} editable={false}/>
          <TextInput style={styles.input} placeholder={'Email address'} value={email}
                     onChangeText={this.onEmailChange}/>
          <View style={{flexDirection: 'row'}}>
            <Text>Engaging Contractor/Mover</Text>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.data.engaging_contractor.choose = selected.target.checked
              this.setState({showingMovingContractor: selected.target.checked})
            }}/>
          </View>
          {this.renderContractorForm()}

          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={this.onCalendarChanged}/>
        </ScrollView>
        <Button type={'primary'} style={styles.submitBtn} onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}