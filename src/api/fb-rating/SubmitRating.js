import CONFIG from '../../utils/Config'

export default query = async ({id, rate, comment}) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/rev/feedback/rate'
    let form: FormData = new FormData()
    form.append('id', id)
    form.append('rate', rate)
    form.append('comment', comment)

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: CONFIG.token,
        Accept: 'application/json',
        'Content-Type': 'form-data',
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
      reject('Server error, Please try again later')
    })
  })
}