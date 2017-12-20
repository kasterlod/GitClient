import React, { Component } from 'react'
import { 
  ScrollView, Text, KeyboardAvoidingView, View, FlatList,
  TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import HomeActions from '../Redux/HomeRedux'
import { BarIndicator } from 'react-native-indicators';
import Icon from 'react-native-vector-icons/FontAwesome';
import s from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      sortVisible: false,
      sortType: 0,
      filterType: 0,
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

  handleFilterClick = (filterType) => {
    this.setState({
      filterVisible: false,
      filterType
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

  filterSwitcher = () => {
    const switcher = {
      '0': (item) => item,
      '1': ({type}) => type === 'directory',
      '2': ({type}) => type === 'text',
      '3': ({type}) => type === 'image',
      '4': ({type}) => type === 'pdf',
      '5': ({type}) => type === 'html',
    }
    return switcher[this.state.filterType]
  }

  onFolderPress = ({ key, name }) => () => this.props.navigateTo(name, key)

  onShowDetailsPress = item => () => {
    console.log('dwadwadwadw')
  }

  previewSwitcher = (type, uri, small) => {
    const switcher = {
      directory: <Icon name='folder' size={small ? 25 : 50} color='black' />,
      image: <Image source={{uri}} style={s.image} />,
      text: <Icon name='file-text' size={small ? 25 : 45} color='black' />,
      pdf: <Icon name='file-pdf-o' size={small ? 25 : 45} color='black' />,
    }
   return switcher[type]
  }
  
  gridItem = ({item, item: { id, modified, name, isAvailable, type, uri, size }}) => 
  <TouchableOpacity
    style={s.gridItem}
    onPress={type === 'directory' ? this.onFolderPress(item) : this.onShowDetailsPress(item)}
    key={id}
  >
    <View style={s.previewG}>
      {this.previewSwitcher(type, uri)}
    </View>
    <View style={s.colContainerG}>
      <Text style={s.nameR}>{name}</Text>
      <View style={{flexDirection: 'row', marginBottom: 2}}>
        <Text style={s.typeR}>{type}</Text>
        <Text style={s.typeR}>{`${parseFloat(size/1024/1024).toFixed(2)} MB`}</Text>
      </View>
    </View>
    <Text style={s.dateG}>{modified}</Text>
    {type !== 'directory' && isAvailable !== undefined && <View style={{...s.statusG, ...isAvailable ? s.available : s.unavailable}} />}
  </TouchableOpacity>
  
  rowItem = ({item, item: { id, modified, name, isAvailable, type, uri, size }}) =>
  <TouchableOpacity
    style={s.rowItem}
    onPress={type === 'directory' ? this.onFolderPress(item) : this.onShowDetailsPress(item)}
    key={id}
  >
    <View style={s.previewR} >
      {this.previewSwitcher(type, uri, true)}
    </View>
    <View style={s.colContainer}>
      <Text style={s.nameR}>{name}</Text>
      <View style={{flexDirection: 'row', marginLeft: 5}}>
        <Text style={s.typeR}>{type}</Text>
        <Text style={s.typeR}>{`${parseFloat(size/1024/1024).toFixed(2)} MB`}</Text>
      </View>
    </View>
    <Text style={s.dateR}>{modified}</Text>
    {type !== 'directory' && isAvailable !== undefined && <View style={{...s.statusR, ...isAvailable ? s.available : s.unavailable}} />}
  </TouchableOpacity>

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

  filterMenu = () => 
    <View style={s.filterMenu}>
    <TouchableOpacity onPress={() => this.handleFilterClick(0)}>
        <View style={[s.sortItem, this.state.filterType === 0 && s.dark]}>
          <Text>none</Text>
        </View>
      </TouchableOpacity>
      <View style={s.line} />
      <TouchableOpacity onPress={() => this.handleFilterClick(1)}>
        <View style={[s.sortItem, this.state.filterType === 1 && s.dark]}>
          <Text>directory</Text>
        </View>
      </TouchableOpacity>
      <View style={s.line} />
      <TouchableOpacity onPress={() => this.handleFilterClick(2)}>
        <View style={[s.sortItem, this.state.filterType === 2 && s.dark]}>
          <Text>text</Text>
        </View>
      </TouchableOpacity>
      <View style={s.line} />
      <TouchableOpacity onPress={() => this.handleFilterClick(3)}>
        <View style={[s.sortItem, this.state.filterType === 3 && s.dark]}>
          <Text>image</Text>
        </View>
      </TouchableOpacity>
      <View style={s.line} />
      <TouchableOpacity onPress={() => this.handleFilterClick(4)}>
        <View style={[s.sortItem, this.state.filterType === 4 && s.dark]}>
          <Text>pdf</Text>
        </View>
      </TouchableOpacity>
      <View style={s.line} />
      <TouchableOpacity onPress={() => this.handleFilterClick(5)}>
        <View style={[s.sortItem, this.state.filterType === 5 && s.dark]}>
          <Text>html</Text>
        </View>
      </TouchableOpacity>
    </View>

  
  handleSort = () => this.setState({sortVisible: !this.state.sortVisible, filterVisible: false})
  
  handleFilter = () => this.setState({filterVisible: !this.state.filterVisible, sortVisible: false})

  handleBackground = () => {
    if (this.state.sortVisible || this.state.filterVisible) {
      this.setState({
        sortVisible: false,
        filterVisible: false,
      })
    }
  }

  render () {
    const { data, path, viewType, fetching, handleChangeView, navigateBack } = this.props
    
    const currentPath = path.asMutable()
    const currentPathLength = currentPath.length
    const dataFiltered = data
      .filter(({ parent }) => parent === (!currentPathLength ? currentPathLength : currentPath[currentPathLength - 1].key))
      .filter(this.filterSwitcher())
    const dataSorted =  dataFiltered.asMutable().sort(this.sortSwitcher())
    
    return (
      <TouchableWithoutFeedback style={s.container} onPress={this.handleBackground}>
        <View style={[s.container, { paddingTop: 0 }]}>
          <View style={s.header}>
            {currentPathLength > 0 && 
              <TouchableOpacity onPress={navigateBack} style={s.backIcon}>
                <Icon name='chevron-left' size={30} color='deeppink' />
              </TouchableOpacity>}
            <TouchableOpacity onPress={this.handleFilter} style={s.headerItem}>
              <Icon name='filter' size={30} color='deeppink' />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSort} style={s.headerItem}>
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
            renderItem={viewType === 1 ? this.rowItem : this.gridItem}
          />}
         {this.state.sortVisible && this.sortMenu()}
         {this.state.filterVisible && this.filterMenu()}
        </View>
      </TouchableWithoutFeedback>
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
  navigateTo: (name, id) => dispatch(HomeActions.navigateTo(name, id)),
  navigateBack: () => dispatch(HomeActions.navigateBack()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
