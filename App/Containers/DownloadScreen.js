import React, {Component} from 'react'
import {ScrollView, Text, KeyboardAvoidingView, View} from 'react-native'
import {connect} from 'react-redux'
import {BarIndicator} from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../Components/Button'
import s from './Styles/DownloadScreenStyle'

class DownloadScreen extends Component {
  render() {
    const {
      totalFiles,
      currentFiles,
      newestVersion,
      currentVersion,
      newestVersionDate,
      currentVersionDate,
      checkVersionFetching,
      offlineAvailableFiles,
      checkVersionFetchingSuccess
    } = this.props

    return (
      <View style={s.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={s.versionContainer}>
            <View style={s.smallPanel}>
              <Text style={s.h}>Current version</Text>
              <Text style={s.a}>{currentVersion}</Text>
              <Text style={s.d}>{currentVersionDate || new Date().toDateString()}</Text>
            </View>
            <View style={s.smallPanel}>
              <Text style={s.h}>Newest version</Text>
              {checkVersionFetching
                ? <BarIndicator color='deeppink' animationDuration={1200} count={5} size={20}/>
                : !checkVersionFetchingSuccess
                  ? <Icon style={s.i} name={'times'} size={20} color={'red'}/>
                  : newestVersion === currentVersion && <Icon style={s.i} name={'check'} size={20} color={'green'}/>}
              {!checkVersionFetching && newestVersion > currentVersion && <Text style={s.a}>{newestVersion}</Text>}
              {!checkVersionFetching && <Text style={s.d}>{checkVersionFetchingSuccess
                  ? newestVersion > currentVersion
                    ? newestVersionDate
                    : 'Up to date!'
                  : 'Unable to fetch!'}</Text>}
            </View>
          </View>
          <View style={s.mainPanel}>
            <View style={s.row}>
                <Text style={s.h}>Total files</Text>
                <Text style={s.a_sm}>{totalFiles}</Text>
            </View>
            <View style={s.row}>
                <Text style={s.h}>Offline available files</Text>
                <Text style={s.a_sm}>{`${offlineAvailableFiles} / ${totalFiles}`}</Text>
            </View>
          </View>
          <View style={s.indicator}><BarIndicator color='deeppink' animationDuration={1200} count={5} size={20}/></View>
          <View style={s.row}>
            {newestVersion === currentVersion && <Button style={s.hidden} />}
            {newestVersion > currentVersion
            && <Button
                //onPress={this.handleSubmit}
                //submitting={submitting}
                //disabled={invalid || !dirty}
                style={s.button}
                text={'Download Offline'}
            />}
            {newestVersion > currentVersion
            && <Button
                //onPress={this.handleSubmit}
                //submitting={submitting}
                //disabled={invalid || !dirty}
                style={s.button}
                text={'Download Online'}
            />}
            {currentVersion > 0 && <Button
                //onPress={this.handleSubmit}
                //submitting={submitting}
                //disabled={invalid || !dirty}
                style={s.button}
                text={'Skip'}
            />}
            </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  currentVersion: state.App.currentVersion,
  currentVersionDate: state.App.currentVersionDate,
  newestVersion: state.App.newestVersion,
  newestVersionDate: state.App.newestVersionDate,
  checkVersionFetching: state.App.checkVersionFetching,
  checkVersionFetchingSuccess: state.App.checkVersionFetchingSuccess,
  totalFiles: state.App.totalFiles,
  currentFiles: state.App.currentFiles,
  newestFiles: state.App.newestFiles,
  offlineAvailableFiles: state.App.offlineAvailableFiles,
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadScreen)
