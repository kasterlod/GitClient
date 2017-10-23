import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import s from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  render () {
    return (
      <View style={s.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={s.header}>

          </View>
          <View style={s.location}>
          
          </View>
          <Text>HomeScreen</Text>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
