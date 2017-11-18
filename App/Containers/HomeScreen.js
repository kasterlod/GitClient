import React, { Component } from 'react'
import { 
  ScrollView, Text, KeyboardAvoidingView, View, FlatList,
  TouchableOpacity, } from 'react-native'
import { connect } from 'react-redux'
import HomeActions from '../Redux/HomeRedux'
import { BarIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from './Styles/HomeScreenStyle'

const gridItem = ({item: { id, modified, name, isAvailable, type }}) => 
<TouchableOpacity
  style={s.gridItem}
  key={id}
>
  <View style={s.previewG} />
  <View style={s.colContainerG}>
    <Text style={s.nameR}>{name}</Text>
    <Text style={s.typeR}>{type}</Text>
  </View>
  <Text style={s.dateG}>{modified}</Text>
  {isAvailable !== undefined && <View style={{...s.statusG, ...isAvailable ? s.available : s.unavailable}} />}
</TouchableOpacity>

const rowItem = ({item: { id, modified, name, isAvailable, type }}) =>
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
</TouchableOpacity>

class HomeScreen extends Component {
  componentDidMount() {
    this.props.getInitialLocation()
  }

  render () {
    const { data, path, viewType, fetching, handleChangeView } = this.props
    return (
      <View style={s.container}>
          <View style={s.header}>
            <TouchableOpacity onPress={handleChangeView}>
              <Icon name={viewType === 1 ? 'th-large' : 'bars'} size={30} color='deeppink' />
            </TouchableOpacity>
          </View>
          <View style={s.line} />
          <ScrollView style={s.location} horizontal={true}>
            {path.map(({name, id}, i) => <Text
              style={i + 1 === path.length ? s.pathLast : s.path}
              key={id}
            >{name}{i + 1 < path.length ? ' / ' : ''}
            </Text>)}
          </ScrollView>
          {fetching ?
            <View style={s.indicator}><BarIndicator color='deeppink' animationDuration={1200} count={5} size={20}/></View>
            : <FlatList
            style={s.scroll}
            numColumns={viewType}
            data={data}
            key={viewType}
            keyExtractor={(item) => item.id}
            renderItem={viewType === 1 ? rowItem : gridItem}
          />}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.Home.data,
  path: state.Home.path,
  viewType: state.Home.viewType,
  fetching: state.Home.fetching,
})

const mapDispatchToProps = (dispatch) => ({
  getInitialLocation: () => dispatch(HomeActions.getInitialLocationAttempt()),
  handleChangeView: () => dispatch(HomeActions.changeViewType()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
