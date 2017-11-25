import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  header: {
    height: 50,
    marginTop: 8,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  line: {
    backgroundColor: 'deeppink',
    height: 2,
  },
  location: {
    flexDirection: 'row',
    maxHeight: 25,
    backgroundColor: 'darkgray',
    paddingHorizontal: 5,
    marginBottom: 2,
  },
  scroll: {
    height: '100%',
    flex: 1,
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
    minHeight: 70,
    minWidth: '100%',
    padding: 7,
    marginBottom: 2,
    backgroundColor: 'white'
  },
  previewR: {
    height: '100%',
    width: 45,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginHorizontal: 3,
    fontSize: 10,
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
  },
  gridItem: {
    flexDirection: 'column',
    
    height: 185,
    minWidth: '31%',
    margin: '1%',
    padding: 7,
    marginBottom: 2,
    backgroundColor: 'white'
  },
  previewG: {
    height: 120,
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colContainerG: {
    marginTop: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateG: {
    color: 'lightgray',
    margin: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  statusG: {
    borderRadius: 30,
    borderWidth: 0,
    height: 10,
    width: 10,
    margin: 10,    
    position: 'absolute',
    top: 5,
    right: 7,
  },
  image: {
    resizeMode: 'contain',
    width: '98%',
    height: '100%',
  }
}
