import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { DownloadTypes } from '../Redux/DownloadRedux'
import { HomeTypes } from '../Redux/HomeRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { loginAttempt } from './LoginSagas'
import { 
  navigateToHome,
  getSettingsAttempt,
  getNewestVersionAttempt,
  upgradeStructureAttempt,
} from './DownloadSagas'
import { getInitialLocationAttempt } from './HomeSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(LoginTypes.LOGIN_ATTEMPT, loginAttempt, api),

    takeLatest(DownloadTypes.NAVIGATE_TO_HOME, navigateToHome),
    takeLatest(DownloadTypes.GET_SETTINGS_ATTEMPT, getSettingsAttempt),
    takeLatest(DownloadTypes.GET_NEWEST_VERSION_ATTEMPT, getNewestVersionAttempt, api),
    takeLatest(DownloadTypes.UPGRADE_STRUCTURE_ATTEMPT, upgradeStructureAttempt, api),
    
    takeLatest(HomeTypes.GET_INITIAL_LOCATION_ATTEMPT, getInitialLocationAttempt)

  ])
}
