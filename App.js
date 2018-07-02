import React, { Component } from 'react'
import Routes from './src/navigation/Routes'
import DetailRoutes from './src/navigation/DetailStack'
import CONFIG from './src/utils/Config'

export default class App extends Component<> {

  constructor (props) {
    super(props)
    CONFIG.rootTag = props.rootTag ? props.rootTag : '1'
    CONFIG.token = props.token != null ? props.token : 'Token 461d6eb020b74eb5bb2f2e519f6048ce3552c28e'
    CONFIG.url = props.url != null ? props.url : 'http://13.250.247.107:8003/v1/rev/'
    CONFIG.id = props.id != null ? parseInt(props.id) : 0
  }

  render () {
    console.log('CONFIG: ' + JSON.stringify(CONFIG))
    if (CONFIG.id === 0) {
      return (
        <Routes/>
      )
    } else {
      return (
        <DetailRoutes/>
      )
    }

  }
}

