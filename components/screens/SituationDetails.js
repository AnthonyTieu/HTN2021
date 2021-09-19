// Import Modules
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import FormInput from '../formComponents/FormInput';
import StepIndicator from 'react-native-step-indicator';
import * as yup from 'yup';
import { Formik } from 'formik';

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

// Contact Number Regex
const contactRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


// Input Validation
const basicDetailsValidationSchema = yup.object().shape({
    verifiedDoc: yup
        .string(),
    contactNumber: yup
        .string()
        .required('Video required'),
    problemTitle: yup
        .string()
        .required('Problem Title Required')
        .max(1000, 'max 1000 char'),
    describeProblem: yup
        .string()
        .max(2000, 'max 2000 char'),
        
});

// Basic Details() produces the Basic Details Screen
export default function BasicDetails() {
    return (
        <ScrollView style={{ backgroundColor: '#5968F0', }}>
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
                            currentPosition={1}
                            stepCount={3}
                        />
                    </View>
                </View>
                <Text style={styles.title}>Situation Details</Text>
                <Text style={styles.subtitle}>Fill in your details</Text>
                <Formik
                    validationSchema={basicDetailsValidationSchema}
                    initialValues={{
                        verifiedDoc: '',
                        uploadVideo: '',
                        problemTitle: '',
                        describeProblem: ''
                    }}
                    onSubmit={(values, actions) => {
                        console.log(values.verifiedDoc);
                        console.log(values.uploadVideo);
                        console.log(values.problemTitle);
                        console.log(values.describeProblem);
                    }}
                >
                    {(props) => (<View>
                        <FormInput
                            title="Upload your verified Documents"
                            width={175}
                            height={45}
                            hasIcon={true}
                            iconType="attach-outline"
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('verifiedDoc')}
                            value={props.values.verifiedDoc}
                            
                        />
                        <FormInput
                            title="Upload Video"
                            width={175}
                            height={45}
                            hasIcon={true}
                            iconType="attach-outline"
                            hasBottomMessage={true}
                            onChangeText={props.handleChange('uploadVideo')}
                            value={props.values.uploadVideo}
                            bottomMessage={"Video size 2 min"}
                        />
                        <FormInput
                            title="Enter Problem Title"
                            width={175}
                            height={45}
                            hasIcon={false}
                            hasBottomMessage={false}
                            onChangeText={props.handleChange('problemTitle')}
                            value={props.values.problemTitle}
                            onBlur={props.handleBlur('problemTitle')}
                            hasError={props.touched.problemTitle && props.errors.problemTitle}
                            bottomMessage={props.errors.problemTitle}
                        />
                    
                        <FormInput
                            title="Describe the Problem"
                            flex={1}
                            height={200}
                            hasIcon={false}
                            hasBottomMessage= {"true"}
                            placeholder = 'Introduce the problem, reasons for the problem, why it is important problem.'
                            onChangeText={props.handleChange('describeProblem')}
                            value={props.values.describeProblem}
                            multiline = {true}
                            numberOfLines = {13}
                            bottomMessage={"2000 char"}
                        />
                        <Button
                            style={{ marginVertical: 25, borderRadius: 1 ,marginBottom:50}}
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
