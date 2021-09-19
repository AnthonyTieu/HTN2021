// Import Modules
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import FormInput from '../formComponents/FormInput';
import StepIndicator from 'react-native-step-indicator';
import * as yup from 'yup';
import { Formik } from 'formik';
import * as Location from 'expo-location';

// Window size
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Progress indicator styles
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 1,
    stepStrokeWidth: 1,
    stepStrokeCurrentColor: '#9F9F9F',
    stepStrokeFinishedColor: '#E3E3E3',
    stepStrokeUnFinishedColor: '#E3E3E3',
    separatorFinishedColor: '#707070',
    separatorUnFinishedColor: '#707070',
    stepIndicatorFinishedColor: '#EFEFEF',
    stepIndicatorUnFinishedColor: '#EFEFEF',
    stepIndicatorCurrentColor: '#BFBFBF',
    stepIndicatorLabelCurrentColor: '#FFFFFF',
    stepIndicatorLabelFinishedColor: '#000000',
    stepIndicatorLabelUnFinishedColor: '#000000',
}

const getCharities = async (location) => {
    await fetch(`https://api.data.charitynavigator.org/v2/Organizations?app_id=96f28b63&app_key=a9b10bb107fb0def5c2cd238148bee83&city=${location}&noGovSupport=true`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
};

// Basic Details() produces the Basic Details Screen
export default function NGOsNearby({ route, navigation }) {
    const { location } = route.params;
    return (
        <ScrollView style={{ backgroundColor: '#5968F0', }} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 36,
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: windowWidth * 0.075,
                borderTopRightRadius: windowWidth * 0.075,
                marginTop: windowHeight * 0.09,
                paddingTop: windowHeight * 0.045
            }}>
                <View style={{ marginBottom: 45, flex: 1, alignItems: 'center' }}>
                    <View style={{ width: 200 }}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={2}
                            stepCount={3}
                        />
                    </View>
                </View>
                <Text style={styles.title}>List of NGO's near your location</Text>
                <Text style={styles.subtitle}>Based on your current location, we have 3 NGO's</Text>
                <Button
                    style={{ marginVertical: 25, borderRadius: 1 }}
                    color='#5968F0'
                    mode="contained"
                    dark
                    uppercase={false}
                    onPress={() => getCharities(location)}>
                    <Text style={{ fontSize: 20 }}>Next</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

// Basic Details Stylesheet
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#5968F0',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    formContainer: {
        width: windowWidth,
        height: windowHeight * 0.92,
        borderTopLeftRadius: windowWidth * 0.075,
        borderTopRightRadius: windowWidth * 0.075,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        paddingHorizontal: windowWidth * 0.09
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 13
    },
    subtitle: {
        fontSize: 13,
        marginBottom: 38
    }
});
