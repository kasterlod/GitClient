import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import s from './Styles/HomeScreenStyle'

const gridItem = (({item: { key }}) => {console.log(key); return <Text>{key}</Text>})

const rowItem = (({item: { key }}) => <View
  style={s.rowItem}
>
  <View style={s.previewR} />
  <Text style={s.nameR}>{key}</Text>
  <Text style={s.dateR}>12-10-2017</Text>
  <View style={{...s.statusR, ...s.unavailable}} />
</View>)

class HomeScreen extends Component {
  render () {
    const { data, path, viewType } = this.props
    return (
      <View style={s.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={s.header}>

          </View>
          <View style={s.line} />
          <ScrollView style={s.location} horizontal={true}>
            {path.map(({name, id}, i) => <Text
              style={i + 1 === path.length ? s.pathLast : s.path}
              key={id}
            >{name}{i + 1 < path.length ? ' / ' : ''}
            </Text>)}
          </ScrollView>
          <FlatList
            style={s.scroll}
            numColumns={viewType}
            data={[{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}, {key: 'e'}, {key: 'f'}]}
            renderItem={viewType === 1 ? rowItem : gridItem}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.Home.data,
  path: state.Home.path,
  viewType: state.Home.viewType,
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
