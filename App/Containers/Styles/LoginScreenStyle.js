import { StyleSheet } from 'react-native'

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignSelf: 'stretch',
    width: 320,
    borderRadius: 8,
    padding: '10%',
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 10,
    textAlign: 'auto',
    height: 40,
  },
  invalidInput: {
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
  },
  validInput: {
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
  },
  button: {
    backgroundColor: 'deeppink',
    borderRadius: 6,
    marginTop: 15,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: 0.2,
    width: 180,
    height: 37,
  },
}
