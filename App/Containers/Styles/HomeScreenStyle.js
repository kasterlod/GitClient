import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  header: {
    height: 50,
    marginTop: 8,
    backgroundColor: 'white',
  },
  line: {
    backgroundColor: 'deeppink',
    height: 2,
  },
  location: {
    flexDirection: 'row',
    height: 25,
    backgroundColor: 'darkgray',
    paddingHorizontal: 5,
    marginBottom: 2,
  },
  scroll: {
    height: '100%',
  },
  path: {
    paddingTop: 2,
    color: 'white',
  },
  pathLast: {
    paddingTop: 2,
    color: 'white',
    fontWeight: 'bold',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
    height: 70,
    width: '100%',
    padding: 7,
    marginBottom: 2,
    backgroundColor: 'white'
  },
  previewR: {
    height: '100%',
    width: 45,
    borderWidth: 1,
    borderRadius: 5,
  },
  nameR: {
    height: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  colContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  typeR: {
    height: 20,
    marginHorizontal: 10,
    color: 'deeppink'
  },
  dateR: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: 'lightgray',
    margin: 10,
  },
  statusR: {
    borderRadius: 30,
    borderWidth: 0,
    height: 10,
    width: 10,
    margin: 10,    
    position: 'absolute',
    top: 0,
    right: 0,
  },
  available: {
    backgroundColor: 'yellowgreen'
  },
  unavailable: {
    backgroundColor: 'gray',
  },
  indicator: {
    alignSelf: 'center',
    marginBottom: 200,
  }
}
