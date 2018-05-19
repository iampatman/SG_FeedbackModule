import CONFIG from '../../utils/Config'

export default query = () => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/rev/feedback/category'
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: CONFIG.token
      }
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson)
      if (responseJson.detail != null) {
        reject(responseJson.detail)
      }
      CONFIG.terms_url = responseJson.terms
      resolve(responseJson.Feedback_category)
    }).catch((error) => {
      console.log(error)
      reject('Server error, Please try again later')
    })
  })
}