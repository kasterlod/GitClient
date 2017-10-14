import { put, select, call, take } from 'redux-saga/effects'
import DownloadActions from '../Redux/DownloadRedux'
import { NavigationActions } from 'react-navigation'
import { is } from 'ramda'
import { getRealmSettings } from '../Realm/Api'

export function * getSettingsAttempt(action) {
  const { data } = yield call(getRealmSettings)
  yield put(DownloadActions.getSettingsSuccess({...data}))
}

export function * getNewestVersionAttempt(api, action) {
  //const { data } = yield call(getRealmSettings)
  const data = {
    newestVersionDate: 'Sun Oct 15 2017',
    newestVersion: 2,
    newestVersionTotalFiles: 3,
  }
  yield put(DownloadActions.getNewestVersionSuccess({...data}))
}
