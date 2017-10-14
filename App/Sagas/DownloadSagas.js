import { put, select, call, take } from 'redux-saga/effects'
import DownloadActions from '../Redux/DownloadRedux'
import { NavigationActions } from 'react-navigation'
import { is } from 'ramda'
import { getRealmSettings } from '../Realm/Api'

// process STARTUP actions
export function * getSettingsAttempt(action) {
  const { data } = yield call(getRealmSettings)
  yield put(DownloadActions.getSettingsSuccess({...data}))
}
