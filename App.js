import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screen/home';
import SignUp from './src/screen/singnup';
import Login from './src/screen/login';
import Update from './src/screen/update';
import Create from './src/screen/create';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
import FlashMessage from 'react-native-flash-message';


const firebaseConfig = {
  apiKey: "AIzaSyBYZGyF-Ev_lyZNP51BaCPO9lXCd7rnZbs",
  authDomain: "note-app-cedd8.firebaseapp.com",
  projectId: "note-app-cedd8",
  storageBucket: "note-app-cedd8.appspot.com",
  messagingSenderId: "443423431379",
  appId: "1:443423431379:web:9fdf8b0b649bf5050f5226"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff'
  }
}

const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect( () => {
    // signOut(auth)
  }, [])

  useEffect(()=> {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
        setLoading(false)
      }else{
        setUser(null)
        setLoading(false)
      }
    }) 
    return authSubscription;
  }, []);

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
        <ActivityIndicator color="green" size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
      {user ? (
        <>
        <Stack.Screen name="Home" options={{ headerShown: false }} >
          { (props) => <Home {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Create">
          { (props) => <Create {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Update" component={Update} />
        </>
      ) : (
        <>
        <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
       

       
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
