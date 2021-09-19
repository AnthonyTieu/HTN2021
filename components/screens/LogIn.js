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

const Stack = createStackNavigator();

function storeUserRoot(token) {
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
        cancelled: true
      };
    }
  } catch (e) {
    return { error: true };
  }
}

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

function test() {

}
function LogIn() {
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
      <Text style={styles.optionText}>Log in with one of the following options</Text>

      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={signInWithGoogleAsync} style={styles.thirdPartyButton} underlayColor='black'>
          <Image style={styles.image} source={FacebookIcon}></Image>
        </TouchableHighlight>

        <TouchableHighlight style={styles.thirdPartyButton} underlayColor='black'>
          <Image style={styles.image} source={FacebookIcon}></Image>
        </TouchableHighlight>
      </View>

      <FormInput style={{ marginTop: 100 }}
        title="Email"
        width={windowWidth * (0.82)}
        height={45}
        hasIcon={false}
        iconType='mail-outline'
        hasBottomMessage={false}
        bottomMessage="3000 char" />

      <FormInput
        title="Password"
        width={windowWidth * (0.82)}
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
        onPress={test}>
        <Text style={{ fontSize: 20 }}>Next</Text>
      </Button>

      <View style={styles.bottomTextContainer}>
        <Text >Don't have an account? </Text>
        <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>

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
    margin: windowWidth * 0.09,


  },


  signUpText: {
    fontSize: 30,
    marginTop: 100
  },

  optionText: {
    fontSize: 13,
    marginTop: 59
  },


  image: {
    resizeMode: 'contain',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 140,

  },

  thirdPartyButton: {
    height: 45,
    width: (windowWidth * 0.82 - 10) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5968F0',
    borderWidth: 1,
  },

  button: {
    width: windowWidth * (1 - 2 * 0.09),
    color: "#5968F0",
    alignSelf: "flex-end",
    marginTop: 100
  },

  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  }
});