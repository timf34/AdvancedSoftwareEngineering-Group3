import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const initialRegion = {
    latitude: 53.3498,      // Dublin's latitude
    longitude: -6.2603,     // Dublin's longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {/* Add a marker */}
          <Marker
              coordinate={{ latitude: 53.3498, longitude: -6.2603 }}
              title="Dublin"
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
