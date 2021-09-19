import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BasicDetails from './components/screens/BasicDetails';
import CustomStatusBar from './components/other/CustomStatusBar';
import SituationDetails from './components/screens/SituationDetails';

export default function App() {
  return (
    <>
      <CustomStatusBar />
      <SituationDetails />
    </>
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
