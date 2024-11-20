import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput, Button, TouchableOpacity, Text } from 'react-native';


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username == '' || password == '') {
      alert("All fields have to be filled before logging in!")
    }
    else {
      console.log('username: ', username)
      console.log('password: ', password)
      alert(`Username: ${username}\nPassword: ${password}`)
      navigation.goBack()
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.TextInput}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
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
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 45,
    top: '-20%',
  },
  TextInput: {
    width: 100,
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  TouchableOpacity: {
    position: 'absolute',
    alignItems: 'center',
    left: '35%',
    top: '40%',
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