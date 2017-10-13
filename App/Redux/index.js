import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    github: require('./GithubRedux').reducer,
    search: require('./SearchRedux').reducer,
    User: require('./LoginRedux').reducer,
    App: require('./DownloadRedux').reducer,    
    form: formReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
