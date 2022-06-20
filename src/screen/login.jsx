import { View, SafeAreaView,  Text, Image, StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import loginImage from '../../assets/login-image.webp'
import Button from '../components/button';
import Input from '../components/input';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../App';
import { showMessage } from 'react-native-flash-message';

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    try{
      const login  = await signInWithEmailAndPassword(auth, email, password); 
    
      console.log("signed In successfully", login);
    }catch(error){
      console.log("Error --->", error);
      showMessage({
        message: "Something Error Sign In!",
        type: "danger"
      });
    }
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      <Image style={{width: 350, height: 400, alignSelf: 'center'  }} source={loginImage} />
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}} >Never forget your notes</Text>
      <View style={{paddingHorizontal: 16, paddingVertical
      : 25}}> 
        <Input 
        placeholder='Email Address'
        autoCapitalize={'none'}
        onChangeText={(text) => setEmail(text)}
        />
        <Input 
        placeholder='PassWord' 
        onChangeText={(text) => setPassword(text) }
        secureTextEntry />
      </View>
      <View style={{
          flex: 1, 
          justifyContent: 'flex-end',
          alignItems: 'center'
          }} >
          <Button 
          onPress={login}
        title="Login"
        customStyles={{alignSelf: 'center', marginBottom: 40 }}
         />
        <Pressable onPress={() => {
            navigation.navigate('SignUp')
        }} > 
            <Text>Don't have an account? <Text style={{color: 'green', fontWeight: 'bold'}} >SignUp</Text></Text>
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

    }
});