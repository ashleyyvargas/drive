import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
  useColorScheme,
} from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import { Feather, Ionicons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

const mockDriverData = {
  '1': {
    name: 'John Doe',
    phone: '+639171234567',
    coordinates: { latitude: 14.5995, longitude: 120.9842 },
  },
};

const RISK_CONFIG = {
  safe: { label: 'SAFE', color: '#16A34A', bg: '#DCFCE7' },
  warning: { label: 'WARNING', color: '#CA8A04', bg: '#FEF9C3' },
  danger: { label: 'DANGER', color: '#DC2626', bg: '#FEE2E2' },
};

export default function DriverDetailView({ driverId, onBack }) {
  const colorScheme = useColorScheme(); // follow device theme
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const theme = isDarkMode ? darkTheme : lightTheme;

  const driver = mockDriverData[String(driverId)];

  if (!driver) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.notFoundText, { color: theme.danger }]}>
          Driver not found.
        </Text>
        <Pressable onPress={onBack} style={[styles.backFallback, { backgroundColor: theme.primary }]}>
          <Text style={{ color: theme.card }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const mapRef = useRef(null);

  const [driverLocation] = useState(
    new AnimatedRegion({
      latitude: driver.coordinates.latitude,
      longitude: driver.coordinates.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    })
  );

  const [routeCoordinates, setRouteCoordinates] = useState([driver.coordinates]);
  const [riskLevel, setRiskLevel] = useState('safe');
  const [lastAlert, setLastAlert] = useState(null);

  // Simulate IoT risk updates
  useEffect(() => {
    const interval = setInterval(() => {
      const levels = ['safe', 'warning', 'danger'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      setRiskLevel(randomLevel);

      if (randomLevel === 'danger') {
        setLastAlert('Critical driving behavior detected');
        Alert.alert(
          '🚨 Driver in Danger',
          'Critical risk detected. Please contact the driver immediately.'
        );
      }
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      const current = driverLocation.__getValue();
      const next = {
        latitude: current.latitude + (Math.random() - 0.5) * 0.001,
        longitude: current.longitude + (Math.random() - 0.5) * 0.001,
      };
      driverLocation.timing({ ...next, duration: 1000, useNativeDriver: false }).start();
      setRouteCoordinates((prev) => [...prev, next]);
      mapRef.current?.animateToRegion({ ...next, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Emergency call
  const handleEmergencyCall = async () => {
    const url = `tel:${driver.phone}`;
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Error', 'Calling not supported');
      return;
    }
    Linking.openURL(url);
  };

  const risk = RISK_CONFIG[riskLevel];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <Feather name="chevron-left" size={24} color={theme.text} />
            <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
          </Pressable>

          <Text style={[styles.name, { color: theme.text }]}>{driver.name}</Text>
          <Text style={[styles.liveText, { color: theme.primary }]}>● LIVE TRACKING</Text>
        </View>

        {/* Risk Status */}
        <View style={[styles.statusCard, { backgroundColor: risk.bg }]}>
          <Text style={[styles.statusLabel, { color: risk.color }]}>{risk.label}</Text>
          <Text style={[styles.statusText, { color: theme.text }]}>
            {riskLevel === 'safe' && 'Driver operating normally'}
            {riskLevel === 'warning' && 'Unusual driving behavior detected'}
            {riskLevel === 'danger' && 'Immediate attention required'}
          </Text>
        </View>

        {/* Map */}
        <View style={styles.mapCard}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: driver.coordinates.latitude,
              longitude: driver.coordinates.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker.Animated coordinate={driverLocation}>
              <Ionicons name="car" size={32} color={theme.primary} />
            </Marker.Animated>
            <Polyline coordinates={routeCoordinates} strokeColor={theme.primary} strokeWidth={4} />
          </MapView>
        </View>

        {/* Emergency Call */}
        <View style={styles.emergencyContainer}>
          <Pressable style={[styles.emergencyButton, { backgroundColor: theme.danger }]} onPress={handleEmergencyCall}>
            <Text style={[styles.emergencyText, { color: theme.card }]}>Emergency Call Driver</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24, paddingTop: 24 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 3, left: -6 },
  backText: { fontSize: 16 },
  name: { fontSize: 22, fontWeight: '600', marginTop: 8 },
  liveText: { marginTop: 4, fontSize: 12 },

  statusCard: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statusLabel: { fontSize: 14, fontWeight: '700' },
  statusText: { fontSize: 13, marginTop: 4 },

  mapCard: { marginHorizontal: 24, borderRadius: 16, overflow: 'hidden', height: 320, marginBottom: 16 },
  map: { flex: 1 },

  emergencyContainer: { paddingHorizontal: 24 },
  emergencyButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyText: { fontSize: 16, fontWeight: '600' },

  backFallback: { padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 24, marginTop: 20 },
  notFoundText: { padding: 24, fontSize: 18, textAlign: 'center' },
});
