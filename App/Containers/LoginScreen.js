import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import LoginActions from '../Redux/LoginRedux'
import Input from '../Components/Input'
import Button from '../Components/Button'
import s from './Styles/LoginScreenStyle'

class LoginScreen extends Component {

  handleSubmit = () => {
    Keyboard.dismiss()
    this.props.handleSubmit()
  }

  render() {
    const { 
      handleSubmit,
      submitting,
      invalid,
      dirty,
      token,
    } = this.props

    return (
      <View style={s.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={s.content}>
            <Text>Email</Text>
            <Field
              style={s.input}
              invalidStyle={s.invalidInput}
              validStyle={s.validInput}
              name={'email'}
              component={Input}/>
            <Text>Password</Text>
            <Field
              style={s.input}
              invalidStyle={s.invalidInput}
              validStyle={s.validInput}
              name={'password'}
              component={Input}
              password/>
            <Button
              onPress={this.handleSubmit}
              submitting={submitting}
              disabled={invalid || !dirty}
              style={s.button}
              text={'Sign in ' + token + submitting}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const validate = (values) => {
  const errors = {}
  if(!values.email) {
    errors['email'] = ' '
  }
  if(!values.password) {
    errors['password'] = ' '
  }
  return errors
}

const mapStateToProps = (state) => ({
  token: state.User.token
  //userFetching: state.User.userFetching
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => dispatch(LoginActions.loginAttempt({...values}))
})

const LoginScreenForm = reduxForm({
  form: 'login',
  asyncBlurFields: ['email', 'password'],
  validate,
  enableReinitialize: true,
})(LoginScreen)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenForm)
