import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialRegion = {
    latitude: 39.6780,
    longitude: -75.7526,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };

  const locations = [
    { id: 1, latitude: 39.6780, longitude: -75.7526, title: "University of Delaware" },
    { id: 2, latitude: 39.6802, longitude: -75.7553, title: "Morris Library" },
    { id: 3, latitude: 39.6823, longitude: -75.7495, title: "Trabant Student Center" },
  ];

  const handleSearch = () => {
    const location = locations.find(loc => loc.title.toLowerCase() === searchQuery.toLowerCase());
    if (location) {
      setSelectedLocation({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={selectedLocation || initialRegion}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
          />
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ask Valv anything about Campus..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: '5%',
    right: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#25292e',
    padding: 10,
    borderRadius: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
