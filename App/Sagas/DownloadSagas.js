import { put, select, call, take } from 'redux-saga/effects'
import DownloadActions from '../Redux/DownloadRedux'
import { NavigationActions } from 'react-navigation'
import { is } from 'ramda'
import { getRealmSettings, saveRealmSettings, saveStructure } from '../Realm/Api'
import dateFormat from 'dateformat'

export function * getSettingsAttempt(action) {
  const { data } = yield call(getRealmSettings)
  yield put(DownloadActions.getSettingsSuccess({...data}))
}

export function * getNewestVersionAttempt(api, action) {
  const { data } = yield call(getRealmSettings)
  let newData = {}
  const random = Math.random()
  if(random > 0.3 || +data.currentVersion === 0) {
    newData = {
      newestVersionDate: new Date().toDateString(),
      newestVersion: data.currentVersion + 1,
      newestVersionTotalElements: data.totalElements + 3,
    }
  } else {
    newData = {
      newestVersionDate: data.currentVersionDate,
      newestVersion: data.currentVersion,
      newestVersionTotalElements: data.totalElements,
    }
  }
  yield put(DownloadActions.getNewestVersionSuccess({...newData}))
}

export function * navigateToHome() {
  yield put(NavigationActions.navigate({routeName: 'HomeScreen'}))
}

export function * upgradeStructureAttempt(api, action) {
  const { newestVersion, newestVersionTotalElements, newestVersionDate, totalFiles } = yield select((state) => ({
    totalFiles: state.App.totalFiles,    
    newestVersion: state.App.newestVersion,
    newestVersionDate: state.App.newestVersionDate,
    newestVersionTotalElements: state.App.newestVersionTotalElements,
  }))
  const filesInUpdate = 3
  const data = {
    version: newestVersion,
    data: [
    {
      key: 1,
      name: `jakis${newestVersion}.txt`,
      type: 'text',
      parent: 0,
      size: 1024 * 225,
      modified: dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),
      isAvailable: false,
    }, {
      key: 2,
      name: `obrazki${newestVersion}`,
      type: 'directory',
      size: 1024 * 1024 * 0.46,
      parent: 0,
      modified: dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),
    },
    {
      key: 3,
      name: `jakis${newestVersion}.jpg`,
      type: 'image',
      parent: 0,
      size: 1024 * 245,
      modified: dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),
      isAvailable: false,
      uri: 'https://www.w3schools.com/w3css/img_fjords.jpg',
    },
    {
      key: 4,
      name: `jakis${newestVersion}.jpg`,
      type: 'image',
      parent: 2,
      size: 1024 * 245,
      modified: dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),
      isAvailable: false,
      uri: 'https://www.w3schools.com/w3css/img_fjords.jpg',
    },
    {
      key: 5,
      name: `jakis${newestVersion}.txt`,
      type: 'text',
      parent: 2,
      size: 1024 * 225,
      modified: dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss'),
      isAvailable: false,
    }
  ]}
  yield call(saveStructure, {...data})  
  yield call(saveRealmSettings, {newestVersion, newestVersionDate, newestVersionTotalElements})
  yield put(DownloadActions.upgradeStructureSuccess({totalFiles: totalFiles + 2}))
}
