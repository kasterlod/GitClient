import React, { Component } from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {BarIndicator} from 'react-native-indicators';

export default class extends Component {

  render() {
    const {
      text,
      disabled,
      activeStyle,
      submitting,
      ...inputProps
    } = this.props

    return (
      submitting
      ? <View style={{marginTop: 37, marginBottom: 15}}>
          <BarIndicator color='deeppink' animationDuration={1200} count={5} size={20}/>
        </View>
      : <TouchableOpacity {...inputProps}>
          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{text}</Text>
        </TouchableOpacity>
    )
  }
}
