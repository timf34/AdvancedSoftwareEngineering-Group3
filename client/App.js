import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Platform } from 'react-native';

// Only import MapView when not on web platform
const MapView = Platform.select({
  ios: () => require('react-native-maps'),
  android: () => require('react-native-maps'),
  default: () => null,
})?.();

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
      // Use localhost for web development
      const baseUrl = Platform.OS === 'web' ? 'http://localhost:8000' : 'http://10.0.2.2:8000';

      const response = await fetch(`${baseUrl}/echo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setServerResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
      setServerResponse('Error connecting to server');
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
          <div style={{
            height: '70vh',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            border: '1px solid #ccc'
          }}>
            <p>Map Placeholder - Maps functionality limited in web version</p>
          </div>
      );
    }

    if (MapView) {
      return (
          <MapView style={styles.map} initialRegion={initialRegion}>
            <MapView.Marker
                coordinate={{ latitude: 53.3498, longitude: -6.2603 }}
                title="Dublin"
                description="Marker description"
            />
          </MapView>
      );
    }

    return null;
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
    height: '100vh', // Add this for web
    backgroundColor: '#fff', // Add this for web
  },
  map: {
    flex: 0.7,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    flex: Platform.OS === 'web' ? undefined : 0.3,
    height: Platform.OS === 'web' ? '30vh' : undefined,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  response: {
    marginTop: 10,
    fontSize: 16,
  },
});