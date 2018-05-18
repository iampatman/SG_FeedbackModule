import { StyleSheet, Dimensions } from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width
const item_spacing = 20
const item_width = (SCREEN_WIDTH - item_spacing) / 4
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  historyContainer: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  itemContainer: {
    width: 100,
    height: 100,
    borderWidth: 1,
    marginLeft: item_spacing,
    marginTop: item_spacing,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.4,
    // shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  iconImage: {
    height: 40,
    width: 40
  },
  menuTitleText: {
    fontWeight:'bold',
    fontSize: 12,
    textAlign: 'center'
  }
})