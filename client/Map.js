import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function MapScreen({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  const initialRegion = {
    latitude: 53.3498,
    longitude: -6.2603,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const sendToServer = async () => {
    try {
      const baseUrl = Platform.OS === 'web'
        ? 'http://localhost:8000'
        : process.env.EXPO_PUBLIC_API_URL;
      console.log(`Sending request to ${baseUrl}/echo`);

      const response = await fetch(`${baseUrl}/echo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Server response:', data);
      setServerResponse(data.message);
    } catch (error) {
      console.error('Error details:', error);
      setServerResponse(`Error: ${error.message}`);
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={[styles.map, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
          <Text>Map Placeholder - Maps functionality limited in web version</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker style={styles.marker}
            coordinate={{ latitude: 53.3498, longitude: -6.2603 }}
            title="Dublin"
            description="Marker description"
          />
        </MapView>
        <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate('LoginScreen')}
          color="#841584">
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.TouchableOpacity1} onPress={() => navigation.navigate('WeatherScreen')}
          color="#841584">
          <Text>Weather</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderMap()}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter text to send to server"
        />
        <Button title="Send" onPress={sendToServer} />
        {serverResponse ? (
          <Text style={styles.response}>{serverResponse}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...(Platform.OS === 'web' ? {
      height: '100vh',
    } : {}),
  },
  marker: {
    position: 'absolute'
  },
  map: {
    flex: 0.7,
    minHeight: 300,
  },
  inputContainer: {
    ...(Platform.OS === 'web' ? {
      height: '30vh',
    } : {
      flex: 0.3,
    }),
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  response: {
    marginTop: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  TouchableOpacity: {
    position: 'absolute',
    alignItems: 'center',
    left: '70%',
    top: '0%',
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
  TouchableOpacity1: {
    position: 'absolute',
    alignItems: 'center',
    left: '0%',
    top: '0%',
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
