import * as React from 'react';
import { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput, Button, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';


export default function WeatherScreen({ navigation }) {
    
    const fetchFromServer = async () => {
        try {
            const baseUrl = Platform.OS === 'web'
                ? 'http://localhost:8000'
                : process.env.EXPO_PUBLIC_API_URL;
            console.log(`Sending request to ${baseUrl}/weather`);

            const response = await fetch(`${baseUrl}/weather`, {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Server response:', data);
        } catch (error) {
            console.error('Error details:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <SafeAreaView style={styles.container}>

                <TouchableOpacity style={styles.TouchableOpacity} onPress={fetchFromServer}
                    color="#841584">
                    <Text>Weather Data</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 45,
        top: '-20%',
    },
    TouchableOpacity: {
        alignItems: 'center',
        left: '0%',
        top: '5%',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
});