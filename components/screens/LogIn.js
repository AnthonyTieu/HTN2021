import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import FacebookIcon from '../../assets/images/facebook.png'
import FormInput from '../formComponents/FormInput';
import firebase from 'firebase';
import firebaseConfig from '../../config'
import * as Google from 'expo-google-app-auth';
import 'firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';



function storeUserRoot(token){
  firebase.database().ref('root').set(token)
}
async function signInWithGoogleAsync() {
  try {
    console.log("authen start");
    const result = await Google.logInAsync({
      androidClientId: '201868013313-nkpp7cqb1c92t18jle74e70l92sians3.apps.googleusercontent.com',
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result.type);
      
      return result.type;
    } else {
      console.log(failed);
      return { 
        cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

function test(){

}
export default function App() {
  console.log("loginScreenstart")
  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log("onauthstatecalled")
        if (user!==null) {
          const uid = user.uid;
          console.log(uid);
          callback({loggedIn: true});

          storeUserRoot(uid);
        } else {
          // User is signed out
          console.log("authfailed");
          callback({loggedIn: false});
        }
    })

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Log in</Text>
      <Text style={styles.optionText}>Log in with Google</Text>

        <TouchableHighlight onPress = {signInWithGoogleAsync }style={styles.thirdPartyButton} underlayColor='#5968F0'>
        <Icon name="logo-google" size={30} color="black"/>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent:'flex-start',
    margin:windowWidth*0.09,
  },


  signUpText:{
    fontSize:30,
    marginTop:250
  },

  optionText:{
    fontSize:13,
    marginTop:59
  },


  thirdPartyButton:{
    height:45,
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#5968F0',
    borderWidth:1,
    marginBottom:140,
    marginTop:12,
  },

});