// Import Modules
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';

// Get Dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// FormInput() creates a form input
// notes: title: input title
//        width: width of the text input
//        height: height of the text input
//        hasIcon: true if the text input has an icon, false otherwise
//        iconType: name of the icon (currently using ionicons, https://ionic.io/ionicons)
//        hasBottomMessage: true if there is a bottom message to display, false otherwise
//        bottomMessage: value of the bottom message
//        ...rest: other arguments
export default function FormInput({
    title,
    width,
    height,
    hasIcon,
    iconType,
    hasBottomMessage,
    bottomMessage,
    hasError,
    ...rest }) {

    return (
        <View style={[styles.container, { width: width }]}>
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.textInputContainer, { width: width, height: height }]}>
                <TextInput style={styles.textInput} {...rest} />
                {hasIcon &&
                    <View style={styles.rightIconContainer}>
                        <View style={styles.rightIcon}>
                            <Icon
                                name={iconType}
                                size={25}
                                color="#BFBFBF"
                            />
                        </View>
                    </View>
                }
            </View>
            {(hasBottomMessage || hasError) ?
                <View style={[styles.bottomMessageContainer, { alignSelf: 'stretch' }]}>
                    <Text style={hasError ? styles.bottomError : styles.bottomMessage}>{bottomMessage}</Text>
                </View>
                :
                <View style={[styles.bottomMessageContainer, { width: width }]}>
                    <Text style={styles.bottomMessage}></Text>
                </View>
            }
        </View>
    );
};

// Form Input Style
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 6
    },
    title: {
        fontSize: 13,
        marginBottom: 12
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.6,
        borderRadius: 1,
        borderColor: '#5968F0'
    },
    textInput: {
        flex: 1,
        color: "#7F7F7F",
        fontSize: 11,
        textAlignVertical: 'top',
        paddingHorizontal: 16

    },
    rightIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    rightIcon: {
        paddingHorizontal: 12
    },
    bottomMessageContainer: {
        alignItems: 'flex-end',
        marginTop: 6
    },
    bottomMessage: {
        fontSize: 8
    },
    bottomError: {
        fontSize: 8,
        color: '#B00020'
    }
});
