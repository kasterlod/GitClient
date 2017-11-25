import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'

export default ({
  item: {
    id,
    modified,
    name,
    isAvailable,
    type,
    uri
  }
}) => <TouchableOpacity style={s.gridItem} key={id}>
  <View style={s.previewG}/>
  <View style={s.colContainerG}>
    <Text style={s.nameR}>{name}</Text>
    <Text style={s.typeR}>{type}</Text>
  </View>
  <Text style={s.dateG}>{modified}</Text>
  {isAvailable !== undefined && <View
    style={{
    ...s.statusG,
    ...isAvailable
      ? s.available
      : s.unavailable
  }}/>}
</TouchableOpacity>