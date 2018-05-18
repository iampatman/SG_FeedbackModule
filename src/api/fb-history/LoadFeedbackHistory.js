import mockResponse from './mocks/Mock.FormHistory.json'
import CONFIG from '../../utils/Config'

export default query = async () => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/rev/feedback/list'
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: CONFIG.token
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('Response Data: ' + JSON.stringify(responseJson))
        if (responseJson.detail != null) {
          reject(responseJson.detail)
        }
        resolve(responseJson.feedback_list)
      }).catch((error) => {
      console.log(error)
      reject('Server error, Please try again later')
    })
  })
}