import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginAttempt: ['values'],
  loginSuccess: ['token'],
  loginFailure: null,
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  fetching: false,
  initialValues: {
    email: 'test@email.com',
    password: 'Test123!'
  }
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_ATTEMPT]: (state) => state.merge({
    fetching: true,
  }),
  [Types.LOGIN_FAILURE]: (state) => state.merge({
    fetching: false,
  }),
  [Types.LOGIN_SUCCESS]: (state, { token }) => state.merge({
    token,
  }),
})
