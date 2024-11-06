import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';
import { MAPBOX_ACCESS_TOKEN } from '@/constants/MapboxToken';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

export default function ExploreScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return (
        <ThemedView style={styles.container}>
          <ThemedText>{errorMsg}</ThemedText>
        </ThemedView>
    );
  }

  return (
      <ThemedView style={styles.container}>
        <Mapbox.MapView
            style={styles.map}
            logoEnabled={false}
            compassEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}>
          <Mapbox.Camera
              zoomLevel={14}
              centerCoordinate={
                location
                    ? [location.coords.longitude, location.coords.latitude]
                    : [-74.006, 40.7128] // Default to NYC
              }
          />
          {location && (
              <Mapbox.PointAnnotation
                  id="userLocation"
                  coordinate={[location.coords.longitude, location.coords.latitude]}>
                <ThemedView style={styles.annotationContainer}>
                  <ThemedView style={styles.annotationFill} />
                </ThemedView>
              </Mapbox.PointAnnotation>
          )}
        </Mapbox.MapView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  annotationFill: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#7159c1',
    borderColor: '#fff',
    borderWidth: 2,
  },
});