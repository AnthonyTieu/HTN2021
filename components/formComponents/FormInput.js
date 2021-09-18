// Import Modules
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function FormInput({
    title,
    width,
    height,
    hasIcon,
    iconType,
    hasBottomMessage,
    bottomMessage,
    ...rest }) {

    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: width,
            marginBottom: 11
        }}>
            <Text style={{ fontSize: 13, marginBottom: 12 }}>{title}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: width,
                height: height,
                borderWidth: 1,
                borderRadius: 1,
                borderColor: '#5968F0'
            }}>
                <TextInput style={{
                    flex: 1,
                    color: "#7F7F7F",
                    fontSize: 11,
                    paddingHorizontal: 16,
                }} />
                {hasIcon &&
                    <View style={styles.rightIconContainer}>
                        <View style={styles.rightIcon}>
                            <Icon
                                name={iconType}
                                size={18}
                                color="#7F7F7F"
                            />
                        </View>
                    </View>
                }
            </View>
            {hasBottomMessage &&
                <View style={{
                    width: width,
                    alignItems: 'flex-end',
                    marginTop: 6
                }}>
                    <Text style={{ fontSize: 8 }}>{bottomMessage}</Text>
                </View>
            }
        </View>
    );
};

// Form Input Style
const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: 'column',
    },
    innerContainer: {
        paddingVertical: windowHeight * 0.007215,
        flexDirection: 'row',
        alignItems: 'center',
        //borderRadius: windowDiagonal * 0.005389,
        //borderWidth: windowDiagonal * 0.001617
    },
    leftIcon: {
        paddingLeft: windowWidth * 0.03038,
        paddingRight: windowWidth * 0.04861
    },
    rightIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    rightIcon: {
        paddingHorizontal: windowWidth * 0.03038,
    },
    text: {
        flex: 1,
    },
    inputWarning: {
        paddingLeft: windowWidth * 0.03646,
    }
});
