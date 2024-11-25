import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({ navigation }) {
  const [webSocket, setWebSocket] = useState(null);
  const [location, setLocation] = useState({
    latitude: 53.3498,
    longitude: -6.2603,
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const setupWebSocket = () => {
      const wsUrl = Platform.OS === 'web'
          ? 'ws://localhost:8000/ws/location'
          : 'ws://process.env.EXPO_PUBLIC_API_URL/ws/location'; // Replace with actual server URL

      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log('WebSocket connection opened');
        setWebSocket(socket);
      };

      socket.onmessage = (event) => {
        console.log('Message from server:', event.data);
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      return socket;
    };

    const socket = setupWebSocket();
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Permission to access location was denied.');
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 10, // Update only if the device moves 10 meters
          },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            setLocation({ latitude, longitude });
          }
      );

      return () => locationSubscription.remove();
    })();
  }, []);

  const sendLocation = () => {
    if (webSocket) {
      const locationData = JSON.stringify(location);
      webSocket.send(locationData);
      console.log('Sent location:', locationData);
    } else {
      Alert.alert('WebSocket not connected', 'Please wait for the WebSocket connection to establish.');
    }
  };

  return (
      <View style={styles.container}>
        {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
        ) : (
            <>
              <MapView
                  style={styles.map}
                  region={{
                    ...location,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
              >
                <Marker
                    coordinate={location}
                    title="Your Location"
                    description="Real-time location"
                />
              </MapView>
              <TouchableOpacity style={styles.sendButton} onPress={sendLocation}>
                <Text style={styles.buttonText}>Send Location</Text>
              </TouchableOpacity>
            </>
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sendButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: 'red',
  },
});
