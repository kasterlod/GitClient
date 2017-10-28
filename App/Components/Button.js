import React, { Component } from 'react'
import {TouchableOpacity, View, Text} from 'react-native'
import {BarIndicator} from 'react-native-indicators';

export default class extends Component {
  componentWillReceiveProps({disabled, submitting}) {
    if(!!disabled && disabled !== this.props.disabled) {
      this.button.setOpacityTo(disabled ? 0.2 : 1, 150)
    } else if (submitting) {
      this.button.setOpacityTo(1, 150)
    }
  }

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
      : <TouchableOpacity ref={ref => this.button = ref} {...inputProps}>
          <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{text}</Text>
        </TouchableOpacity>
    )
  }
}
