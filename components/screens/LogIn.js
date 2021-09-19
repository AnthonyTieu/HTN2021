import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import FacebookIcon from '../../assets/images/facebook.png'
import FormInput from '../formComponents/FormInput';
import firebase from 'firebase/app'
import {firebaseConfig} from '../../config';
firebase.initializeApp(firebaseConfig);
import * as Google from 'expo-google-app-auth';



async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: '201868013313-nkpp7cqb1c92t18jle74e70l92sians3.apps.googleusercontent.com',
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result.accessToken);
      return result.accessToken;
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
  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Log in</Text>
      <Text style={styles.optionText}>Log in with one of the following options</Text>

      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress = {signInWithGoogleAsync }style={styles.thirdPartyButton} underlayColor='black'>
        <Image style = {styles.image} source = {FacebookIcon}></Image>
      </TouchableHighlight>

      <TouchableHighlight style={styles.thirdPartyButton} underlayColor='black'>
        <Image style = {styles.image} source = {FacebookIcon}></Image>
      </TouchableHighlight>
      </View>

      <FormInput style = {{marginTop:100}}
      title="Email" 
      width={windowWidth*(0.82)} 
      height={45} 
      hasIcon={false} 
      iconType='mail-outline' 
      hasBottomMessage={false} 
      bottomMessage="3000 char" />

<FormInput 
      title="Password" 
      width={windowWidth*(0.82)} 
      height={45} 
      hasIcon={false} 
      iconType='mail-outline' 
      hasBottomMessage={false} 
      bottomMessage="3000 char" />

    <Button
        style={{ marginTop: 25, borderRadius: 1 }}
        color='#5968F0'
        mode="contained"
        dark
        title=" "
        uppercase={false}
        onPress  = {test}>
        <Text style={{ fontSize: 20 }}>Next</Text>
    </Button>

      <View style ={styles.bottomTextContainer}>
        <Text >Don't have an account? </Text>
        <Text style ={{fontWeight:'bold'}}>Sign Up</Text>

      </View>

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
    marginTop:100
  },

  optionText:{
    fontSize:13,
    marginTop:59
  },

  
  image:{
    resizeMode:'contain',
  },

  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:12,
    marginBottom:140,
    
  },

  thirdPartyButton:{
    height:45,
    width:(windowWidth*0.82-10)/2,
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#5968F0',
    borderWidth:1,
  },

  button:{
    width:windowWidth*(1-2*0.09),
    color: "#5968F0",
    alignSelf:"flex-end",
    marginTop:100
  },

  bottomTextContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    marginTop:10
    }
});