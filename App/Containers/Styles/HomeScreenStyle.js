import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  header: {
    height: 50,
    marginTop: 8,
    backgroundColor: 'deeppink',
  },
  location: {
    height: 25,
    backgroundColor: 'darkgray'
  },
}
