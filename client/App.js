import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const initialRegion = {
    latitude: 37.78825,    // Replace with your desired latitude
    longitude: -122.4324,  // Replace with your desired longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {/* Add a marker */}
          <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="My Marker"
              description="Marker description"
          />
        </MapView>
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
});
