import React, { Component } from 'react'
import { 
  ScrollView, Text, KeyboardAvoidingView, View, FlatList,
  TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import HomeActions from '../Redux/HomeRedux'
import { BarIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from './Styles/HomeScreenStyle'

const previewSwitcher = (type, uri, small) => {
  const switcher = {
    directory: <Icon name='folder' size={small ? 25 : 50} color='black' />,
    image: <Image source={{uri}} style={s.image} />,
    text: <Icon name='file-text' size={small ? 25 : 45} color='black' />,
    pdf: <Icon name='file-pdf-o' size={small ? 25 : 45} color='black' />,
  }
 return switcher[type]
}

const gridItem = ({item: { id, modified, name, isAvailable, type, uri, size }}) => 
<TouchableOpacity
  style={s.gridItem}
  key={id}
>
  <View style={s.previewG}>{console.log(uri)}
    {previewSwitcher(type, uri)}
  </View>
  <View style={s.colContainerG}>
    <Text style={s.nameR}>{name}</Text>
    <View style={{flexDirection: 'row', marginBottom: 2}}>
      <Text style={s.typeR}>{type}</Text>
      <Text style={s.typeR}>{`${parseFloat(size/1024/1024).toFixed(2)} MB`}</Text>
    </View>
  </View>
  <Text style={s.dateG}>{modified}</Text>
  {isAvailable !== undefined && <View style={{...s.statusG, ...isAvailable ? s.available : s.unavailable}} />}
</TouchableOpacity>

const rowItem = ({item: { id, modified, name, isAvailable, type, uri, size }}) =>
<TouchableOpacity
  style={s.rowItem}
  key={id}
>
  <View style={s.previewR} >
    {previewSwitcher(type, uri, true)}
  </View>
  <View style={s.colContainer}>
    <Text style={s.nameR}>{name}</Text>
    <View style={{flexDirection: 'row', marginLeft: 5}}>
      <Text style={s.typeR}>{type}</Text>
      <Text style={s.typeR}>{`${parseFloat(size/1024/1024).toFixed(2)} MB`}</Text>
    </View>
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
            data={data.filter(({parent}) => parent === path.length)}
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
