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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  detailContainer:{

  },
  itemRightContainer: {
    alignItems: 'flex-end'
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    alignSelf: 'stretch'
  },
  detailTextStyle1: {
    color: 'gray'
  },
  newMsgContainer: {
    backgroundColor: 'blue',
    padding: 4,
    borderRadius: 5,
    marginTop: 2
  },
  newMsgText: {
    color:'white',
    fontSize: 12,
    fontWeight:'bold'
  }
})