// Import Modules
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Get Dimensions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LocationCards({
    charityName,
    address,
    height,
}) {
    const [selected, setSelected] = useState(false);
    return (
        <TouchableOpacity style={{
            borderWidth: 0.6,
            borderRadius: 1,
            borderColor: '#5968F0',
            height: height,
            padding: 16,
            justifyContent: 'center',
            marginBottom: 25
        }}
            onPress={() => setSelected(!selected)}>
            <View style={{ flexDirection: 'row', marginBottom: 13, alignItems: 'center' }}>
                <Text style={{ flex: 1, fontSize: 17 }} numberOfLines={1}>{charityName}</Text>
                <View style={{
                    marginLeft: 20,
                    borderWidth: 0.75,
                    borderColor: "#5968F0",
                    borderRadius: 1000,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {
                        selected ? <View style={{ backgroundColor: "#5968F0", borderRadius: 1000, width: 12, height: 12 }} />
                            : <View style={{ borderWidth: 0.75, borderColor: "#5968F0", borderRadius: 1000, width: 12, height: 12 }} />
                    }
                </View>
            </View>
            <Text style={{
                fontSize: 11
            }}
                numberOfLines={1}>
                {address}
            </Text>
        </TouchableOpacity>
    );
}
