import React from 'react'
import {
  View,
  Text,
  FlatList, SectionList
} from 'react-native'
import styles from './FormDetail.Style'
import { loadFormDetail } from '../../api/index'

export default class FormDetail extends React.Component {
  constructor (props) {
    super(props)
    const {params} = this.props.navigation.state
    this.state = {
      formId: params.formId,
      data: []
    }
  }

  renderItem = ({item, index, section}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitleText} key={index}>{item.key}</Text>
        </View>
        <View style={styles.itemDetailContainer}>
          <Text key={index}>{item.value}</Text>
        </View>
      </View>
    )
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    loadFormDetail(this.state.formId).then(({data}) => {
      console.log('data: ' + data)
      const extractedData = [
        {
          title: 'Basic Information',
          data: this.extractData(data.basic_information)
        },
        {
          title: 'Owner Information',
          data: this.extractData(data.owner_information)
        },
        {
          title: 'Mover Information',
          data: this.extractData(data.mover_information)
        },
      ]
      console.log('extractedData ' + extractedData)
      this.setState({
        data: extractedData,
        loading: false
      })
    }).catch()
  }

  extractData = (obj) => {
    var data = []
    Object.keys(obj).forEach((key) => {
      data.push({
        key,
        value: obj[key]
      })
    })
    return data
  }

  render () {
    const {data} = this.state
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={({section: {title}}) => <Text style={styles.sectionText}>{title}</Text>}
          sections={data}
        />
      </View>
    )
  }
}