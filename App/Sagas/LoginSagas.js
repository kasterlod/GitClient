import {put, select, call} from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import {NavigationActions} from 'react-navigation'
import {is} from 'ramda'

// process STARTUP actions
export function * loginAttempt({loginUser}, action) {
  const {
    values: {
      email,
      password,
    }
  } = action

  try {
    const { token, validTo } = yield call(loginUser, {
      email,
      password,
    })
    yield put(LoginActions.loginSuccess(token, validTo))
    yield put(NavigationActions.navigate({routeName: 'DownloadScreen'}))
  } catch(error) {
    yield put(LoginActions.loginFailure())
    console.tron.log(error)
  }
}
