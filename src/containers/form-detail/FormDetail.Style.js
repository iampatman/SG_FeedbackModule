import {
  StyleSheet, Dimensions
} from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingBottom: 90
  },
  sectionText: {
    color: 'blue',
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    // height: 25,
    // justifyContent: 'center',
    marginVertical: 5,
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
  },

})