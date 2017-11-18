import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {filter} from 'ramda'
import {startsWith} from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getInitialLocationAttempt: null,
  getInitialLocationSuccess: ['values'],
  navigateTo: ['id'],
  navigateToSuccess: ['location'],
  navigateBack: null,
  navigateBackSuccess: ['location'],
  changeViewType: null,
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  path: [
    {
      name: 'Home',
      id: 0,
    },
    {
      name: 'Home2',
      id: 10,
    }
  ],
  viewType: 3,
  fetching: true,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NAVIGATE_BACK_SUCCESS]: (state, { data }) => state.merge({
    data
  }),
  [Types.GET_INITIAL_LOCATION_SUCCESS]: (state, { values }) => state.merge({
    data: values,
    fetching: false
  }),
  [Types.CHANGE_VIEW_TYPE]: (state) => state.merge({
    viewType: state.viewType === 1 ? 3 : 1
  }),
})
