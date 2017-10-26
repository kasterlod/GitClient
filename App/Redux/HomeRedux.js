import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {filter} from 'ramda'
import {startsWith} from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  navigateTo: ['name'],
  navigateToSuccess: ['data'],
  navigateBack: null,
  navigateBackSuccess: ['data'],
})

export const HomeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [
    {
      id: 1,
      name: 'jakis.txt',
      type: 'text',
      parent: 0,
      modified: '2016-09-21 14:32:17',
    }, {
      id: 2,
      name: 'obrazki',
      type: 'directory',
      parent: 0,
      modified: '2016-10-11 09:07:42',
    }
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
  viewType: 1
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NAVIGATE_BACK_SUCCESS]: (state, {data}) => state.merge({
    data
  }),
})
