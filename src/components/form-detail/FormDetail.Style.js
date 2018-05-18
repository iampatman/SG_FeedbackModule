import {
  StyleSheet, Dimensions
} from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  sectionText: {
    color: 'blue',
    fontWeight:'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    height: 25,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  itemTitleContainer: {
    flex: 1
  },
  itemTitleText: {
    color: 'gray'
  },
  itemDetailContainer: {
    flex: 1.5
  }
})