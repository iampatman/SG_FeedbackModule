import n from '../RouteNames'
import { NavigationActions } from 'react-navigation'

export const resetToRoute = (navigation: Function, routeName: string, params = {}) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params
      })
    ]
  })
  navigation.dispatch(resetAction)
}

export const navigateToMovingForm = (navigation, param) => {
  navigation.navigate(n.MOVING, param)
}

export const navigateToRentalForm = (navigation, param) => {
  navigation.navigate(n.RENTAL, param)
}

export const navigateToRenovationForm = (navigation, param) => {
  navigation.navigate(n.RENOVATION, param)
}

export const navigateToVehicleForm = (navigation, param) => {
  navigation.navigate(n.VEHICLE, param)
}

export const navigateToRefundForm = (navigation, param) => {
  navigation.navigate(n.REFUND, param)
}
export const resetToHome = (navigation, param) => {
  resetToRoute(navigation, n.FORM_MENU)
}

export const navigateToFormDetail = (navigation, param) => {
  navigation.navigate(n.FORM_DETAIL, param)
}
export const navigateToThankyou = (navigation, param) => {
  navigation.navigate(n.THANK_YOU, param)
}

export const navigateToHistory = (navigation, param) => {
  navigation.navigate(n.SUBMISSION_HISTORY, param)
}