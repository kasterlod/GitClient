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
  <View style={s.previewG}>
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
  constructor() {
    super()
    this.state = {
      sortVisible: false,
      sortType: 0
    }
  }

  componentDidMount() {
    this.props.getInitialLocation()
  }

  handleSortClick = (sortType) => {
    this.setState({
      sortVisible: false,
      sortType
    })
  }

  sortSwitcher = () => {
    const switcher = {
      '0': (item1, item2) => (item1.date < item2.date),
      '1': (item1, item2) => (item1.date > item2.date),
      '2': (item1, item2) => (item1.name < item2.name),
      '3': (item1, item2) => (item1.name > item2.name),
      '4': (item1, item2) => (item1.size < item2.size),
      '5': (item1, item2) => (item1.size > item2.size),
    }
    return switcher[this.state.sortType]
  }

  sortMenu = () => 
  <View style={s.sortMenu}>
    <TouchableOpacity onPress={() => this.handleSortClick(0)}>
      <View style={[s.sortItem, this.state.sortType === 0 && s.dark]}>
        <Text>date</Text>
        <Icon name='sort-desc' size={20} color='deeppink' style={{marginBottom: 7}}/>
      </View>
    </TouchableOpacity>
    <View style={s.line} />
    <TouchableOpacity onPress={() => this.handleSortClick(1)}>
      <View style={[s.sortItem, this.state.sortType === 1 && s.dark]}>
        <Text>date</Text>
        <Icon name='sort-asc' size={20} color='deeppink' style={{marginTop: 7}}/>
      </View>
    </TouchableOpacity>
    <View style={s.line} />
    <TouchableOpacity onPress={() => this.handleSortClick(2)}>
      <View style={[s.sortItem, this.state.sortType === 2 && s.dark]}>
        <Text>name</Text>
        <Icon name='sort-desc' size={20} color='deeppink' style={{marginBottom: 7}}/>
      </View>
    </TouchableOpacity>
    <View style={s.line} />
    <TouchableOpacity onPress={() => this.handleSortClick(3)}>
      <View style={[s.sortItem, this.state.sortType === 3 && s.dark]}>
        <Text>name</Text>
        <Icon name='sort-asc' size={20} color='deeppink' style={{marginTop: 7}}/>
      </View>
    </TouchableOpacity>
    <View style={s.line} />
    <TouchableOpacity onPress={() => this.handleSortClick(4)}>
      <View style={[s.sortItem, this.state.sortType === 4 && s.dark]}>
        <Text>size</Text>
        <Icon name='sort-desc' size={20} color='deeppink' style={{marginBottom: 7}}/>
      </View>
    </TouchableOpacity>
    <View style={s.line} />
    <TouchableOpacity onPress={() => this.handleSortClick(5)}>
      <View style={[s.sortItem, this.state.sortType === 5 && s.dark]}>
        <Text>size</Text>
        <Icon name='sort-asc' size={20} color='deeppink' style={{marginTop: 7}}/>
      </View>
    </TouchableOpacity>
  </View>

  render () {
    const { data, path, viewType, fetching, handleChangeView } = this.props
    const dataFiltered = data.filter(({parent}) => parent === path.length)
    const dataSorted =  dataFiltered.asMutable().sort(this.sortSwitcher())
    
    return (
      <View style={s.container}>
          <View style={s.header}>
            <TouchableOpacity onPress={() => this.setState({sortVisible: !this.state.sortVisible})} style={s.headerItem}>
              <Icon name='sort' size={30} color='deeppink' />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangeView} style={s.headerItem}>
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
            data={dataSorted}
            key={viewType}
            keyExtractor={(item) => item.id}
            renderItem={viewType === 1 ? rowItem : gridItem}
          />}
         {this.state.sortVisible && this.sortMenu()}
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
