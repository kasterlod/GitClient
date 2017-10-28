import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import DownloadScreen from '../Containers/DownloadScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  DownloadScreen: { screen: DownloadScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'DownloadScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
