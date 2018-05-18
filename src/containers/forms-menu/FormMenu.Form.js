import n from '../../navigation/RouteNames'

export default [
  {
    id: 1,
    title: 'Moving',
    icon: require('../../assets/icons/ic_moving_blue.png'),
    nextScreen: n.MOVING
  },
  {
    id: 2,
    title: 'Rental',
    icon: require('../../assets/icons/ic_rental_blue.png'),
    nextScreen: n.RENTAL
  },
  {
    id: 3,
    title: 'Renovation',
    icon: require('../../assets/icons/ic_renovation_blue.png')
  },
  {
    id: 4,
    title: 'Unit Car Registration',
    icon: require('../../assets/icons/ic_car_blue.png')
  },
  {
    id: 5,
    title: 'Refund',
    icon: require('../../assets/icons/ic_wallet_blue.png')
  }
]
