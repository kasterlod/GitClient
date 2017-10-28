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
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [
    {
      key: 1,
      name: 'jakis.txt',
      type: 'text',
      parent: 0,
      modified: '2016-09-21 14:32:17',
      isAvailable: true,
    }, {
      key: 2,
      name: 'obrazki',
      type: 'directory',
      parent: 0,
      modified: '2016-10-11 09:07:42',
    },
    {
      key: 3,
      name: 'jakis2.jpg',
      type: 'image',
      parent: 0,
      modified: '2016-05-07 14:32:17',
      isAvailable: true,
    },
  ],
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
  viewType: 1,
  fetching: true,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NAVIGATE_BACK_SUCCESS]: (state, { data }) => state.merge({
    data
  }),
  [Types.GET_INITIAL_LOCATION_SUCCESS]: (state, { values }) => state.merge({
    ...values,
    fetching: false
  }),
})
