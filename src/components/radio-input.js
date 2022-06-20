import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function RadioInput({label, value, setValue, size='small'}) {
    const isSelected = value === label;
  return (
    <TouchableOpacity onPress={ () => setValue(label) } > 
        <View style={styles.container} > 
            <View style={[styles.outerCircle, isSelected && styles.selectedOuterCircle, size='big' && styles.bigOuterCircle]} > 
                <View style={[styles.innerCircle, isSelected && styles.selectedInnerCircle, size='big' && styles.bigOuterCircle]} ></View>
            </View>
            <Text style={{marginLeft: 10, fontWeight: "bold"}} >{label}</Text>
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    outerCircle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#cfcfcf',
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center'
    },
    innerCircle: {
      height: 10,
      width: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#cfcfcf',
    },
    selectedOuterCircle: {
      borderColor: 'orange'
    },
    selectedInnerCircle: {
      backgroundColor: 'orange',
      borderColor: 'orange'
    },
 
});