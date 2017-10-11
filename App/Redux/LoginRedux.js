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
  initialValues: {
    email: 'test@email.com'
  }
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_SUCCESS]: (state, { token }) => ({
    token,
  }),
})
