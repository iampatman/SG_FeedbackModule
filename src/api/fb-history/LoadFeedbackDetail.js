import mockResponse from './mocks/Mock.MovingFormDetail.json'
import CONFIG from '../../utils/Config'

export default query = async (id) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + `feedback/detail?id=${id}`
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
        resolve(responseJson)
      }).catch((error) => {
      console.log(error)
      reject('Server error, Please try again later')
    })
  })
}