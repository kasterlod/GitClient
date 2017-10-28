import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  versionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35
  },
  smallPanel: {
    width: 130,
    height: 70,
    margin: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  mainPanel: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 15,
    height: 140
  },
  h: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  a: {
    color: 'deeppink',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  a_sm: {
    color: 'deeppink',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  a_sm_g: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  a_sm_r: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  d: {
    color: 'gray',
    textAlign: 'center',
    opacity: 0.6
  },
  i: {
    flex: 1,
    alignSelf: 'center'
  },
  row: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'deeppink',
    borderRadius: 6,
    marginHorizontal: 8,
    marginTop: 230,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 100,
    height: 47
  },
  indicator: {
    marginTop: 100
  },
  hidden: {
    width: 0,
    height: 0
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    margin: 0,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'column',
    height: 30,
    width: 25,
    padding: 0,
    marginRight: -5
  }
})
