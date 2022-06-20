import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/input'
import RadioInput from '../components/radio-input';
import Button from '../components/button';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ['red', 'green', 'blue'];

export default function Create({navigation, route, user}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    try{
      await addDoc(collection( db, 'notes' ), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid
      });
      setLoading(false);
      showMessage({
        message: "Note Created Successfully!",
        type: "success"
      })
      navigation.goBack();
    }catch(err){
      console.log('err ', err);
      setLoading(false);
    }
    
  }


  return (
    <SafeAreaView style={{marginHorizontal: 20, flex: 1}} >
       <Input 
        placeholder='Title' 
        onChangeText={(text)=> setTitle(text)} 
        />
        <Input 
        placeholder='Description' 
        onChangeText={(text)=> setDescription(text)} 
        multiline={true}

        />
        { noteColorOptions.map((option, index) => (
          <RadioInput 
          key={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
          />
        ) ) }

        {loading ? <ActivityIndicator /> :  <Button
        title="Submit"
        customStyles={{alignSelf: 'center', marginBottom: 40, marginTop: 60, width: '100%'  }}
        onPress={onPressCreate}
         />  }

       


       
    </SafeAreaView>
  )
}