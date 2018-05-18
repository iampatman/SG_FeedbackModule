import CONFIG from '../../utils/Config'

export default query = async (data) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/message/create'
    let form: FormData = new FormData()
    console.log('send mssgae data' + JSON.stringify(data))
    form.append('id', data.id)
    form.append('formtype', data.formtype)
    form.append('message', data.message)
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: CONFIG.token,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form
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
      // reject('Server error, Please try again later')
      reject(error)
    })
  })
}