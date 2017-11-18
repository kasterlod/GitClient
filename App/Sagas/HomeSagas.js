import { put, select, call, take } from 'redux-saga/effects'
import HomeActions from '../Redux/HomeRedux'
import { NavigationActions } from 'react-navigation'
import { is } from 'ramda'
import { getInitialLocation } from '../Realm/Api'

export function * getInitialLocationAttempt(action) {
  const { data } = yield call(getInitialLocation)
  yield put(HomeActions.getInitialLocationSuccess(Object.values(data)))
}
