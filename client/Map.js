import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ navigation }) {
  const [webSocket, setWebSocket] = useState(null);
  const [location, setLocation] = useState({ latitude: 53.3498, longitude: -6.2603 });

  useEffect(() => {
    const wsUrl = Platform.OS === 'web'
        ? 'ws://localhost:8000/ws/location'
        : 'ws://your-server-url/ws/location'; // Replace with actual server URL

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

    return () => {
      socket.close();
    };
  }, []);

  const sendLocation = () => {
    if (webSocket) {
      const locationData = JSON.stringify(location);
      webSocket.send(locationData);
      console.log('Sent location:', locationData);
    }
  };

  return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
              ...location,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={(region) => setLocation(region)}
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
});
