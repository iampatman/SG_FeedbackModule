import { ActionSheet } from 'antd-mobile'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import ImagePicker from 'react-native-image-picker'
import Images from '../../assets/Images'

export const SELECTED_TYPE = {
  IMAGE: 1,
  DOCUMENT: 2
}

export default showUploadFileActionSheet = (props: Object) => {

  const {onComplete, title} = props

  const options = ['Document', 'Camera Roll', 'Take Photo', 'Cancel']
  ActionSheet.showActionSheetWithOptions({
    options, cancelButtonIndex: 3, title: title ? title : 'Upload'
  }, (selectedId) => {
    console.log('uploadFile ' + selectedId)
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    switch (selectedId) {
      case 0:
        DocumentPicker.show({
          filetype: [DocumentPickerUtil.allFiles()],
        }, (error, response) => {
          console.log('DocumentPicker: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.DOCUMENT, error != null ? null : response)
        })
        break
      case 1:
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('launchImageLibrary: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.IMAGE, response)
        })
        break
      case 2:
        ImagePicker.launchCamera(options, (response) => {
          console.log('launchCamera: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.IMAGE, response)
        })
        break
    }
  })
}