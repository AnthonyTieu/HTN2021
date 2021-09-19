import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import FacebookIcon from '../../assets/images/facebook.png'
import FormInput from '../formComponents/FormInput';
import firebase from 'firebase';
import firebaseConfig from '../../config'
import * as Google from 'expo-google-app-auth';
import BasicDetails from './BasicDetails';
import NGOsNearby from './NGOsNearby';
import InformationShared from './InformationShared';
import SituationDetails from './SituationDetails';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

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
        cancelled: true
      };
    }
  } catch (e) {
    return { error: true };
  }
}

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;
function LogIn({ navigation }) {
  console.log("loginScreenstart")
  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log("onauthstatecalled")
      if (user !== null) {
        const uid = user.uid;
        console.log(uid);
        storeUserRoot(uid);

      } else {
        // User is signed out
      }
    })

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.signUpText}>Log in</Text>
      <Text style={styles.optionText}>Please log in with Google</Text>

      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={() => { signInWithGoogleAsync(); navigation.navigate("Basic Details") }} style={styles.thirdPartyButton} underlayColor='black'>
          <Icon name="logo-google" size={30} />
        </TouchableHighlight>
      </View>
    </View>
  );
}

function DetailsNav() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen name="Log In" component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Basic Details" component={BasicDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Situation Details" component={SituationDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NGOsNearby" component={NGOsNearby}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InformationShared" component={InformationShared}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DetailsNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    padding: windowWidth * 0.09,


  },


  signUpText: {
    fontSize: 30,
    marginTop: 250
  },

  optionText: {
    fontSize: 13,
    marginTop: 59
  },

  thirdPartyButton: {
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5968F0',
    borderWidth: 1,
    marginTop: 12,

  },


});