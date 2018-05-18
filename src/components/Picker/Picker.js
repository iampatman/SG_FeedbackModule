


import Picker from 'react-native-picker'

export const showPicker = (props = {}) => {
  Picker.init({
    pickerConfirmBtnText: 'Confirm',
    pickerCancelBtnText: 'Cancel',
    pickerTitleText: 'Select',
    ...props
  })
  Picker.show()
}
