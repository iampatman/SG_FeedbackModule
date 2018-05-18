import n from './RouteNames'
import { StackNavigator } from 'react-navigation'
import FormDetailScreen from '../containers/form-detail/FormDetail.Screen'


export default StackNavigator({
  [n.FORM_DETAIL]: {screen: FormDetailScreen},
}, {
  initialRouteName: n.FORM_DETAIL
})