// Import Modules
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import FormInput from '../formComponents/FormInput';
import StepIndicator from 'react-native-step-indicator';
import * as yup from 'yup';
import { Formik } from 'formik';
import * as Location from 'expo-location';
import { createStackNavigator } from '@react-navigation/stack';
import NGOsNearby from './NGOsNearby';
import InformationShared from './InformationShared';
import SituationDetails from './SituationDetails';

// Window size
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Stack = createStackNavigator();

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

// Contact Number Regex
const contactRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Input Validation
const basicDetailsValidationSchema = yup.object().shape({
    childName: yup
        .string(),
    contactNumber: yup
        .string()
        .matches(contactRegex, 'Invalid Contact.')
        .required('Contact Number Required.'),
    childAge: yup
        .string()
        .matches(/^[0-9]*$/, 'Invalid Age.')
        .max(2, 'Invalid Age.'),
    location: yup
        .string()
        .required('Location Required.'),
    parentName: yup
        .string(),
});

// getPermissions() requests location permissions
const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert(
            'Location permissions required!',
            'Please grant location permissions to use this app.',
            [{ text: 'Okay' }]
        );
        return false;
    }
    return true;
};

// getLocation(setFieldValue) gets the user longitude, latitude, and city name
const getLocation = async (setFieldValue) => {
    const hasPermission = await getPermissions();
    if (!hasPermission) {
        return;
    }
    await Location.getCurrentPositionAsync({ timeout: 5000 })
        .then(async (location) => {
            console.log(location.coords.latitude);
            await fetch(`http://api.positionstack.com/v1/reverse?access_key=8a9cc6abf8509c6dcbc28fdb732251fe&query=${location.coords.latitude},${location.coords.longitude}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json.data[0].locality);
                    setFieldValue('location', json.data[0].locality);
                })
        })
};

// Basic Details() produces the Basic Details Screen
function BasicDetails({ navigation }) {
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
                            currentPosition={0}
                            stepCount={3}
                        />
                    </View>
                </View>
                <Text style={styles.title}>Basic details</Text>
                <Text style={styles.subtitle}>Fill in your details</Text>
                <Formik
                    validationSchema={basicDetailsValidationSchema}
                    initialValues={{
                        childName: '',
                        contactNumber: '',
                        childAge: '',
                        location: '',
                        parentName: ''
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values.childName);
                        console.log(values.contactNumber);
                        console.log(values.childAge);
                        console.log(values.location);
                        console.log(values.parentName);
                        navigation.navigate('Situation Details', { screen: 'Situation Details', location: values.location });
                    }}
                >
                    {(props) => (<View>
                        <FormInput
                            title="Child Name"
                            width={windowWidth * 0.5 - 36}
                            height={45}
                            hasIcon={false}
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('childName')}
                            value={props.values.childName}
                        />
                        <FormInput
                            title="Contact Number"
                            width={windowWidth * 0.5 - 36}
                            height={45}
                            hasIcon={false}
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('contactNumber')}
                            value={props.values.contactNumber}
                            keyboardType='number-pad'
                            onBlur={props.handleBlur('contactNumber')}
                            hasError={props.touched.contactNumber && props.errors.contactNumber}
                            bottomMessage={props.errors.contactNumber}
                        />
                        <FormInput
                            title="Child Age"
                            width={windowWidth * 0.5 - 36}
                            height={45}
                            hasIcon={false}
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('childAge')}
                            value={props.values.childAge}
                            keyboardType='number-pad'
                            onBlur={props.handleBlur('childAge')}
                            hasError={props.touched.childAge && props.errors.childAge}
                            bottomMessage={props.errors.childAge}
                        />
                        <FormInput
                            title="Location"
                            flex={1}
                            height={45}
                            hasIcon={true}
                            iconType="locate-outline"
                            iconFunction={() => getLocation(props.setFieldValue)}
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('location')}
                            value={props.values.location}
                            onBlur={props.handleBlur('location')}
                            hasError={props.touched.location && props.errors.location}
                            bottomMessage={props.errors.location}
                        />
                        <FormInput
                            title="Parent name/Guardian"
                            flex={1}
                            height={45}
                            hasIcon={false}
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('parentName')}
                            value={props.values.parentName}
                        />
                        <Button
                            style={{ marginVertical: 25, borderRadius: 1 }}
                            color='#5968F0'
                            mode="contained"
                            dark
                            uppercase={false}
                            onPress={props.handleSubmit}>
                            <Text style={{ fontSize: 20 }}>Next</Text>
                        </Button>
                    </View>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

function DetailsNav() {
    return (
        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
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
