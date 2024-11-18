import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({navigation}) {
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
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="My Marker"
              description="Marker description"
            />
          </MapView>
          <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate('LoginScreen')}
          color="#841584">
          <Text>Log In</Text>
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
    TouchableOpacity: {
      position: 'absolute', // Positioning over the map
      alignItems: 'center',
      left: '70%',
      top: '50%',
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
