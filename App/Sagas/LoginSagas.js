import { put, select } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { NavigationActions } from 'react-navigation'
import { is } from 'ramda'

// process STARTUP actions
export function * loginAttempt (api, action) {
  const { values:{ email, password }} = action
  
  yield put(LoginActions.loginSuccess('test_token'))
  yield put(NavigationActions.navigate({ routeName: 'DownloadScreen' }))
  
}
