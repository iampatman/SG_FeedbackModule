import { StyleSheet, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const item_spacing = 20
const item_width = (SCREEN_WIDTH - item_spacing) / 4
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    alignItems:'center',
    justifyContent:'space-around'
  },
  thankyou_text: {
    color: 'white',
    fontSize: 20
  },
  description_text: {
    color: 'white',
    fontSize: 14
  },
  submitBtn: {backgroundColor:'blue', width: SCREEN_WIDTH-100},
  submitText: {color:'white'}
})