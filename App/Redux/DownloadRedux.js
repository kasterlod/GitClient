import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'
import getRealmInstance from '../Realm'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onStoreCheckedChange: null,

  getSettingsAttempt: null,
  getSettingsSuccess: ['values'],

  saveSettingsAttempt: ['values'],

  getNewestVersionAttempt: null,
  getNewestVersionSuccess: ['values'],

  upgradeStructureAttempt: null,
  upgradeStructureSuccess: ['values'],
  upgradeStructureFailure: null,

  navigateToHome: null,
})

export const DownloadTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  storeOlderFiles: true,
  currentVersion: 0,
  totalElements: 0,
  downloading: false,
  currentVersionDate: new Date().toDateString(),
  checkVersionFetching: true,
  checkVersionFetchingSuccess: false,
  upgrading: false,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_STORE_CHECKED_CHANGE]: (state) => state.merge({
    storeOlderFiles: !state.storeOlderFiles,
  }),
  [Types.GET_SETTINGS_SUCCESS]: (state, { values }) => state.merge({
    ...values,
  }),
  [Types.GET_NEWEST_VERSION_SUCCESS]: (state, { values }) => state.merge({
    ...values,
    checkVersionFetchingSuccess: true,
    checkVersionFetching: false,
  }),
  [Types.UPGRADE_STRUCTURE_ATTEMPT]: (state) => state.merge({
    upgrading: true,
  }),
  [Types.UPGRADE_STRUCTURE_SUCCESS]: (state, { values }) => state.merge({
    ...values,
    upgrading: false,
    currentVersion: state.newestVersion,
    currentVersionDate: state.newestVersionDate,
    totalElements: state.newestVersionTotalElements,
  }),
  [Types.UPGRADE_STRUCTURE_FAILURE]: (state) => state.merge({
    upgrading: false,
  }),
})
