import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/input'
import RadioInput from '../components/radio-input';
import Button from '../components/button';
import { addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ['red', 'green', 'blue'];

export default function Update({navigation, route, user}) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);
  const onPressUpdate = async () => {
    setLoading(true);
    try{
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
      });
      setLoading(false);
      showMessage({
        message: "Note Updated Successfully!",
        type: "success"
      });
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
        value={title}
        />
        <Input 
        placeholder='Description' 
        onChangeText={(text)=> setDescription(text)} 
        multiline={true}
        value={description}
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
        onPress={onPressUpdate}
         />  }

       


       
    </SafeAreaView>
  )
}