import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {filter} from 'ramda'
import {startsWith} from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getInitialLocationAttempt: null,
  getInitialLocationSuccess: ['values'],
  navigateTo: ['name', 'key'],
  navigateBack: null,
  changeViewType: null,
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  path: [],
  viewType: 3,
  fetching: true,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NAVIGATE_BACK]: (state) => state.merge({
    path: state.path.slice(0, state.path.length - 1),
  }),
  [Types.NAVIGATE_TO]: (state, { name, key }) => state.merge({
    path: [...state.path, { name, key }]
  }),
  [Types.GET_INITIAL_LOCATION_SUCCESS]: (state, { values }) => state.merge({
    data: values,
    fetching: false
  }),
  [Types.CHANGE_VIEW_TYPE]: (state) => state.merge({
    viewType: state.viewType === 1 ? 3 : 1
  }),
})
