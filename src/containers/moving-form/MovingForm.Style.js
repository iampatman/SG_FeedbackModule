import { StyleSheet, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const item_spacing = 20
const item_width = (SCREEN_WIDTH - item_spacing) / 4
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: SCREEN_HEIGHT
  },
  input: {
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4
  },
  submitBtn: {position: 'absolute', bottom: 0, width: SCREEN_WIDTH, height: 65},
  datePickerView: {
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4,
    justifyContent: 'center'
  }
})