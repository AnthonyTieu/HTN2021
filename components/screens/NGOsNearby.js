// Import Modules
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import LocationCards from '../formComponents/LocationCards';
import StepIndicator from 'react-native-step-indicator';

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


// Basic Details() produces the Basic Details Screen
export default function NGOsNearby({ route, navigation }) {
    const [charities, setCharities] = useState([]);
    const { location } = route.params;

    const getCharities = async (location) => {
        await fetch(`https://api.data.charitynavigator.org/v2/Organizations?app_id=96f28b63&app_key=a9b10bb107fb0def5c2cd238148bee83&categoryID=6&causeID=17&city=${location}&noGovSupport=true`)
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                var tempCharities = [];
                for (var i = 0; i < json.length; i++) {
                    if (json[i].charityName) {
                        var address = '';
                        var hasPrev = false;
                        if (json[i].mailingAddress.streetAddress2) {
                            address += json[i].mailingAddress.streetAddress2;
                            hasPrev = true;
                        }
                        if (json[i].mailingAddress.streetAddress1) {
                            address += `${hasPrev ? ', ' : ''}${json[i].mailingAddress.streetAddress1}`;
                            hasPrev = true;
                        }
                        if (json[i].mailingAddress.city) {
                            address += `${hasPrev ? ', ' : ''}${json[i].mailingAddress.city}`;
                            hasPrev = true;
                        }
                        if (json[i].mailingAddress.stateOrProvince) {
                            address += `${hasPrev ? ', ' : ''}${json[i].mailingAddress.stateOrProvince}`;
                            hasPrev = true;
                        }
                        if (json[i].mailingAddress.postalCode) {
                            address += `${hasPrev ? ', ' : ''}${json[i].mailingAddress.postalCode}`;
                            hasPrev = true;
                        }
                        if (json[i].mailingAddress.country) {
                            address += ', ' + json[i].mailingAddress.country;
                        }
                        tempCharities.push({
                            name: json[i].charityName,
                            address: address
                        });
                    }
                }
                console.log(tempCharities);
                setCharities(tempCharities);
            })
    };

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
                <View style={{ marginBottom: 45, alignItems: 'center' }}>
                    <View style={{ width: 200 }}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={2}
                            stepCount={3}
                        />
                    </View>
                </View>
                <Text style={styles.title}>List of NGO's near your location</Text>
                <Text style={styles.subtitle}>Based on your current location, we have {charities.length} NGO's</Text>
                <View>
                    {
                        charities.map((item, index) => (
                            <LocationCards key={item.address} charityName={item.name} address={item.address} height={80} />
                        ))
                    }
                </View>
                <Button
                    style={{ marginVertical: 25, borderRadius: 1 }}
                    color='#5968F0'
                    mode="contained"
                    dark
                    uppercase={false}
                    onPress={() => getCharities(location)}>
                    <Text style={{ fontSize: 20 }}>Submit</Text>
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
        marginBottom: 37
    }
});
