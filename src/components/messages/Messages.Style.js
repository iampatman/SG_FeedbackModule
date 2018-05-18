import {
  StyleSheet, Dimensions
} from 'react-native'

export default StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: 'white',
  },
  sectionText: {
    color: 'blue',
    fontWeight: 'bold'
  },
  itemContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTitleContainer: {
    flex: 1
  },
  itemTitleText: {
    color: 'gray'
  },
  timeTagText: {
    color: 'gray',
    fontSize: 10,
  },
  itemDetailContainer: {
    flex: 2
  },
  sendMsgContainer: {
    alignItems: 'flex-end'
  },
  submitBtn: {
    width: 100, height: 40
  },

  messageInput: {
    alignSelf: 'stretch',
    height: 70,
    borderWidth: 1,
    borderColor: 'gray',
    // backgroundColor: 'gray',
    padding: 10,
    marginVertical: 10
  }
})