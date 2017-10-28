import React, { Component } from 'react'
import { 
  ScrollView, Text, KeyboardAvoidingView, View, FlatList,
  TouchableOpacity, } from 'react-native'
import { connect } from 'react-redux'
import s from './Styles/HomeScreenStyle'

const gridItem = (({item: { key }}) => {console.log(key); return <Text>{key}</Text>})

const rowItem = (({item: { id, modified, name, isAvailable, type }}) =>
<TouchableOpacity
  style={s.rowItem}
  key={id}
>
  <View style={s.previewR} />
  <View style={s.colContainer}>
    <Text style={s.nameR}>{name}</Text>
    <Text style={s.typeR}>{type}</Text>
  </View>
  <Text style={s.dateR}>{modified}</Text>
  {isAvailable !== undefined && <View style={{...s.statusR, ...isAvailable ? s.available : s.unavailable}} />}
</TouchableOpacity>)

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
            data={data}
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
