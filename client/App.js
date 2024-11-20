import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
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
      : 'http://192.168.13.1:8000'
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
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker
              coordinate={{ latitude: 53.3498, longitude: -6.2603 }}
              title="Dublin"
              description="Marker description"
          />
        </MapView>
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
});