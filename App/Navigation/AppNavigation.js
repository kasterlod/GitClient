import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'
import DownloadScreen from '../Containers/DownloadScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  DownloadScreen: { screen: DownloadScreen },
  LoginScreen: { screen: LoginScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
