import { ActionSheet } from 'antd-mobile'
import ImagePicker from 'react-native-image-picker'

export const SELECTED_TYPE = {
  IMAGE: 1,
  DOCUMENT: 2
}

const DOCUMENT_OPTION = 'Document'
const CAMERA_ROLL_OPTION = 'Camera Roll'
const TAKE_PHOTO_OPTION = 'Take Photo'
const CANCEL_OPTION = 'Cancel'

export const showUploadFileActionSheet = (props: Object) => {

  const {onComplete, title} = props

  const optionsTitle = [CAMERA_ROLL_OPTION, TAKE_PHOTO_OPTION, CANCEL_OPTION]
  ActionSheet.showActionSheetWithOptions({
    options: optionsTitle, cancelButtonIndex: 3, title: title ? title : 'Upload'
  }, (selectedId) => {
    console.log('uploadFile ' + selectedId)
    const options = {
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    switch (selectedId) {
      case optionsTitle.indexOf(DOCUMENT_OPTION):
        DocumentPicker.show({
          filetype: [DocumentPickerUtil.allFiles()],
        }, (error, response) => {
          console.log('DocumentPicker: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.DOCUMENT, error != null ? null : response)
        })
        break
      case optionsTitle.indexOf(CAMERA_ROLL_OPTION):
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('launchImageLibrary: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.IMAGE, response)
        })
        break
      case optionsTitle.indexOf(TAKE_PHOTO_OPTION):
        ImagePicker.launchCamera(options, (response) => {
          console.log('launchCamera: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.IMAGE, response)
        })
        break
    }
  })
}