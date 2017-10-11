import { put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { is } from 'ramda'

// process STARTUP actions
export function * loginAttempt (api, action) {
  const { email, password } = action

  //yield put(LoginActions.loginSuccess())

}
