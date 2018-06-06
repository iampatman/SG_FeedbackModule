import CONFIG from '../../utils/Config'

export default query = async ({id, rating}) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + 'feedback/rate'
    let form: FormData = new FormData()
    const starValues = ['poor', 'fair', 'good', 'very_good', 'excellent']
    console.log('rating ' + rating)
    form.append('id', id)
    form.append('rate', starValues[rating])
    form.append('comment', ' ')
    console.log('Request data: ' + JSON.stringify(form))
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