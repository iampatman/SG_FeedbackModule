import CONFIG from '../../utils/Config'

export default query = async (data) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/rev/feedback/register'
    console.log('Submitting form: ' + JSON.stringify({data}))
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: CONFIG.token,
        Accept: 'application/json',
        'Content-Type': 'form-data',
      },
      body: JSON.stringify({data})
    }).then((response) => {
      console.log(response)
      return response.json()
    }).then((responseJson) => {
      console.log(responseJson)
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