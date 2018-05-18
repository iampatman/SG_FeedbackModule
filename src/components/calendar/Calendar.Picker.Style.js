import {
  StyleSheet,
  Dimensions
} from 'react-native'

const {width} = Dimensions.get('window')

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    backgroundColor: 'gray',
    opacity: 0.7
  },
  titleContainer: {
    height: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 15
  },
  calendarContainer: {
    flex: 1,
    width: width,
    // height: width / 2,
    justifyContent: 'flex-start',
    opacity: 1
  }
})
