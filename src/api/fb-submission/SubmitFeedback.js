import CONFIG from '../../utils/Config'

export default query = async ({category_id, subcategory_id, description, image}) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + 'feedback/register'
    // console.log('Submitting form: ' + JSON.stringify({data}))
    let form: FormData = new FormData()
    form.append('category_id', category_id)
    form.append('subcategory_id', subcategory_id)
    form.append('description', description)
    form.append('image', image)

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: CONFIG.token,
        Accept: 'application/json',
        // 'Content-Type': 'form-data',
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
      reject('Server error, Please try again later')
    })
  })
}