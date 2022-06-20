import { View, Text, TouchableOpacity, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../App';

export default function Home({navigation, route, user}) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // create the query
     const q = query(collection(db, 'notes'), where("uid", "==", user.uid) );
     // create listener to listen to the query that we just made 
     const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id});
      });
      setNotes(list);
      setLoading(false);
     });
     return notesListenerSubscription;
  },[]);

  const renderItem = ({item}) => {
    const {title, description, color} = item;
    return (
      <TouchableOpacity 
      onPress={() => {
        navigation.navigate("Update", {item});
      }}
      style={{backgroundColor: color,
       marginBottom: 25, 
       borderRadius: 16, 
       padding: 15}} 

       >
       <Pressable style={{ 
        position: "absolute", 
        alignSelf: "flex-end", 
        padding: 10, 
        backgroundColor: "#00000066", 
        borderRadius: 16, 
        zIndex: 999
        }}
        onPress={() => {
          deleteDoc(doc(db, "notes", item.id));
        }}
        > 
       <AntDesign name="delete" size={24} color="white" />
       </Pressable>
        <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>{title}</Text>
        <Text style={{color: '#fff', fontSize: 18, marginTop: 16}}>{description}</Text>
      </TouchableOpacity>
    )
  }

  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
        <ActivityIndicator color="green" size="large" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}> 
      <View style={{
        flexDirection: "row", 
        justifyContent: "space-between",
        padding: 20
        }}>
      <Text>My Note</Text> 
      <TouchableOpacity onPress={onPressCreate}> 
        <AntDesign name="pluscircleo" size={24} color="black" />
      </TouchableOpacity>
       
         
      </View>
      <FlatList 
      data={notes} 
      renderItem={renderItem} 
      keyExtractor={ (item) => item.title} 
      contentContainerStyle={{padding: 20}}
      />
    </SafeAreaView>
  )
}