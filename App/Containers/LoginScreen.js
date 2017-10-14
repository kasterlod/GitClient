import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { isEmail } from '../Utils'
import LoginActions from '../Redux/LoginRedux'
import DownloadActions from '../Redux/DownloadRedux'
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
              text={'Sign in'}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const validate = ({email, password}) => {
  const errors = {}
  if (!email) {
    errors['email'] = ' '
  } else if (!isEmail(email)) {
    errors['email'] = ' '
  }
  if (!password) {
    errors['password'] = ' '
  } else if (password.length > 12 || password.length < 5) {
    errors['password'] = ' '
  }
  return errors
}

const mapStateToProps = (state) => ({
  token: state.User.token,
  initialValues: state.User.initialValues,
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => dispatch(LoginActions.loginAttempt({...values})),
})

const LoginScreenForm = reduxForm({
  form: 'login',
  asyncBlurFields: ['email', 'password'],
  validate,
  enableReinitialize: true,
})(LoginScreen)

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenForm)
