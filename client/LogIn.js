import * as React from 'react';
import {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, View, SafeAreaView, TextInput, Button, TouchableOpacity, Text } from 'react-native';


export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = () => {
  if (username == null || password == null) {
    alert("All fields have to be filled before logging in!")
  }
  console.log('username: ', username)
  console.log('password: ', password)
  alert(`Username: ${username}\nPassword: ${password}`);
  navigation.goBack();
};

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Login Screen</Text> */}
        {/* <Button title="Go Back" onPress={() => navigation.goBack()} /> */}
  
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                // onSubmitEditing={() => alert(`Welcome to ${message}`)}
                style={styles.TextInput}
            />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                // onSubmitEditing={() => alert(`You have logged in`)}
                secureTextEntry
                style={styles.TextInput}
            />
        </SafeAreaView>

        <TouchableOpacity style={styles.TouchableOpacity} onPress={handleLogin}
          color="#841584">
          <Text>Log In</Text>
         </TouchableOpacity>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 45,
  },
  TextInput: {
    width: 100, // Makes both inputs the same width
    height: 50, // Sets identical height for both inputs
    backgroundColor: '#fff',
    borderColor: '#ccc', // Light gray border
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    paddingHorizontal: 10, // Adds padding inside the input
    marginBottom: 15, // Adds space between inputs
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  TouchableOpacity: {
    position: 'absolute', // Positioning over the map
    alignItems: 'center',
    left: '35%',
    top: '60%',
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
  TouchableOpacityText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});