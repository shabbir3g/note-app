import { View, Text, StyleSheet, TextInput  } from 'react-native'
import React from 'react'

export default function Input({placeholder, secureTextEntry, onChangeText, value, autoCapitalize, multiline }) {
  return  <TextInput 
  placeholder={placeholder} 
  secureTextEntry={secureTextEntry} 
  style={styles.input}
  onChangeText={onChangeText}
  autoCorrect={false}
  value={value}
  autoCapitalize={autoCapitalize}
  multiline={multiline}
   />
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc',
        marginBottom: 25

    }
});