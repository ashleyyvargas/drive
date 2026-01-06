import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, Feather } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

export default function LocationView({ onNavigate }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // optional for dark/light
  const theme = darkMode ? darkTheme : lightTheme;

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setCurrentLocation(region);
    })();
  }, []);

  if (!currentLocation) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.surface }]}>
        <Text style={{ color: theme.textSecondary }}>
          Fetching current location...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation
      >
        <Marker coordinate={currentLocation}>
          <View style={[styles.markerOuter, { backgroundColor: theme.primary + '20' }]}>
            <View style={[styles.markerInner, { backgroundColor: theme.primary }]} />
          </View>
        </Marker>
      </MapView>

      {/* Info Card */}
      <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.divider }]}>
        <Ionicons name="location" size={20} color={theme.primary} />
        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.infoTitle, { color: theme.textPrimary }]}>Current Location</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {currentLocation.latitude.toFixed(5)}, {currentLocation.longitude.toFixed(5)}
          </Text>
          <Text style={[styles.infoTime, { color: theme.textSecondary }]}>Last updated: Just now</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.navbar, { backgroundColor: theme.surface, borderColor: theme.divider }]}>
        <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')} theme={theme} />
        <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} theme={theme} />
        <NavItem icon="map-pin" label="Location" active theme={theme} />
        <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} theme={theme} />
        <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} theme={theme} />
      </View>
    </View>
  );
}

/* Bottom Nav Item */
function NavItem({ icon, label, onPress, active, theme }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={active} style={{ alignItems: 'center' }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: active ? theme.primarySoft : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather
          name={icon}
          size={18}
          color={active ? theme.primary : theme.textSecondary}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: active ? theme.primary : theme.textSecondary,
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  markerOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },

  infoCard: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  infoTitle: { fontSize: 14, fontWeight: '600' },
  infoText: { fontSize: 12, marginTop: 2 },
  infoTime: { fontSize: 11, marginTop: 2 },

  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
});
