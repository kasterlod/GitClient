import React from 'react'
import { TextInput, View, Text } from 'react-native'

export default function Input (props) {
  const { input, meta, password, style, activeStyle, invalidStyle, validStyle, ...inputProps } = props

  return (
    <View>
      <TextInput
        {...inputProps}
        style={{...style, ...meta.error ? invalidStyle : validStyle}}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        secureTextEntry={password}
      />
     </View>
  )
}
