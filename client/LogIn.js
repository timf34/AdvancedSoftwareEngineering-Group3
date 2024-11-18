import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';


export default function LoginScreen({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Login Screen</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }