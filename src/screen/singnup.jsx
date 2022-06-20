import { View, SafeAreaView,  Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../App';
import {setDoc, addDoc, collection, getDocs, doc, onSnapshot, query, where} from "firebase/firestore";
import { showMessage } from 'react-native-flash-message';



const OPTIONS = ['male', 'female'];

export default function SignUp({navigation}) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const signUp = async () => {
     setLoading(true);
     try{
       // 1. create use with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("result ---> ", result);
      // 2. add user profile to database
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid
      });
      setLoading(false);
     
     }catch(error){
       console.log("Error --->", error);
       showMessage({
         message: "ERROR!",
         type: "danger"
       });
       setLoading(false);
     }
  } 
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 16, paddingVertical
      : 25}}> 
        <Input 
        placeholder='Email Address' 
        onChangeText={(text)=> setEmail(text)} 
        autoCapitalize={"none"}
        />
        <Input 
        placeholder='PassWord' 
        secureTextEntry 
        onChangeText={(text)=> setPassword(text)} 
        />
        <Input 
        placeholder='Full Name'
        onChangeText={(text)=> setName(text)} 
        autoCapitalize={"words"}
         />
        <Input 
        placeholder='Age' 
        onChangeText={(text)=> setAge(text)} 
        />
        <View style={{ marginVertical: 20 }}> 
          <Text>Select Gender</Text>
        </View>
        {
          OPTIONS.map((option) => {
            const selected = option === gender;
            return(
              <Pressable 
              onPress={() => setGender(option) }
              key={option} 
              style={styles.radioContainer} > 
                <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}> 
                  <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}></View>
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </Pressable>
            );
          })
        }
      </View>
      <View style={{
          flex: 1, 
          justifyContent: 'flex-end',
          alignItems: 'center'
          }} >
          <Button 
        title="Sign Up"
        customStyles={{alignSelf: 'center', marginBottom: 40 }}
        onPress={signUp}
         />
        <Pressable onPress={() => {
            navigation.navigate('Login');
        }} > 
            <Text>Already have an account? <Text style={{color: 'green', fontWeight: 'bold'}} >Sign In</Text></Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc',
        marginBottom: 25

    },
    radioContainer: {
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
    }
});