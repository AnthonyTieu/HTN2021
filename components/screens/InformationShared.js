// Import Modules
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';;
import Icon from 'react-native-vector-icons/Ionicons';

// Window size
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Basic Details() produces the Basic Details Screen
export default function InformationShared({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#5968F0', alignItems: 'center', justifyContent: 'center', paddingHorizontal: windowWidth * 0.09 }}>
            <View style={{ height: windowHeight * 0.4, width: windowWidth * 0.8, backgroundColor: "#FFFFFF", borderRadius: windowWidth * 0.075, alignItems: 'center', justifyContent: 'center', }}>
                <Icon
                    name="checkmark-circle-outline"
                    size={90}
                    color="#5968F0"
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Information Shared</Text>
                <Text style={{ fontSize: 13, marginTop: 15 }}>Selected NGO's will contact you shortly</Text>
            </View>
        </View>
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
