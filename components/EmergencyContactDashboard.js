import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

const mockDrivers = [
  {
    id: '1',
    name: 'John Doe',
    status: 'warning',
    lastLocation: 'Manila, Philippines',
    lastUpdate: '5 mins ago',
    phone: '+639171234567',
    coordinates: { latitude: 14.5995, longitude: 120.9842 },
    route: [
      { latitude: 14.5995, longitude: 120.9842 },
      { latitude: 14.6000, longitude: 120.9850 },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    status: 'safe',
    lastLocation: 'Quezon City, Philippines',
    lastUpdate: '1 hour ago',
    phone: '+639189876543',
    coordinates: { latitude: 14.6760, longitude: 121.0437 },
    route: [
      { latitude: 14.6760, longitude: 121.0437 },
      { latitude: 14.6770, longitude: 121.0445 },
    ],
  },
];

export default function EmergencyContactDashboard({ onNavigate, onViewDriver }) {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers(prevDrivers =>
        prevDrivers.map(driver => {
          const newCoord = {
            latitude: driver.coordinates.latitude + (Math.random() - 0.5) * 0.0005,
            longitude: driver.coordinates.longitude + (Math.random() - 0.5) * 0.0005,
          };
          return {
            ...driver,
            coordinates: newCoord,
            route: [...driver.route, newCoord],
            lastUpdate: 'Just now',
            lastLocation: `Lat:${newCoord.latitude.toFixed(4)}, Lng:${newCoord.longitude.toFixed(4)}`,
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = status => {
    switch (status) {
      case 'safe': return theme.level1;
      case 'warning': return theme.level2;
      case 'danger': return theme.level3;
      default: return theme.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={[styles.headerTitle, { color: theme.background }]}>Connected Drivers</Text>
        <Text style={[styles.headerSubtitle, { color: theme.primarySoft }]}>
          Monitor drivers who added you
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.driverList}>
        {drivers.map(driver => (
          <TouchableOpacity
            key={driver.id}
            style={[styles.driverCard, { backgroundColor: theme.surface, shadowColor: '#000' }]}
            onPress={() => onViewDriver(driver.id)}
          >
            <View style={styles.driverInfo}>
              <View style={[styles.avatar, { backgroundColor: theme.primarySoft }]}>
                <FontAwesome5 name="user" size={24} color={theme.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.driverHeader}>
                  <Text style={[styles.driverName, { color: theme.textPrimary }]}>{driver.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(driver.status) }]}>
                    <Text style={styles.statusText}>{driver.status.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.driverLocation}>
                  <Feather name="map-pin" size={16} color={theme.textSecondary} />
                  <Text style={[styles.driverLocationText, { color: theme.textSecondary }]}>
                    {driver.lastLocation}
                  </Text>
                </View>

                <Text style={[styles.driverUpdated, { color: theme.textSecondary }]}>
                  Updated {driver.lastUpdate}
                </Text>

                <View style={styles.miniMapContainer}>
                  <MapView
                    style={styles.miniMap}
                    initialRegion={{
                      latitude: driver.coordinates.latitude,
                      longitude: driver.coordinates.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                    pointerEvents="none"
                  >
                    <Marker coordinate={driver.coordinates} />
                    {driver.route.length > 1 && (
                      <Polyline
                        coordinates={driver.route}
                        strokeColor={theme.primary}
                        strokeWidth={2}
                      />
                    )}
                  </MapView>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.bottomNav, { backgroundColor: theme.surface, borderTopColor: theme.divider }]}>
        <NavButton icon="users" label="Drivers" active theme={theme} onPress={() => onNavigate('ec-dashboard')} />
        <NavButton icon="bell" label="Notifications" theme={theme} onPress={() => onNavigate('ec-notifications')} />
        <NavButton icon="settings" label="Settings" theme={theme} onPress={() => onNavigate('ec-settings')} />
      </View>
    </View>
  );
}

function NavButton({ icon, label, onPress, active, theme }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={active} style={styles.navButton}>
      {icon === 'users' ? (
        <FontAwesome5 name={icon} size={24} color={active ? theme.primary : theme.textSecondary} />
      ) : (
        <Feather name={icon} size={24} color={active ? theme.primary : theme.textSecondary} />
      )}
      <Text style={{ fontSize: 12, marginTop: 4, color: active ? theme.primary : theme.textSecondary }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingVertical: 24, paddingHorizontal: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 4 },
  driverList: { paddingHorizontal: 16, paddingVertical: 12 },
  driverCard: { borderRadius: 16, padding: 12, marginBottom: 16, shadowOpacity: 0.05, shadowRadius: 5 },
  driverInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  driverHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  driverName: { fontSize: 16, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusText: { fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
  driverLocation: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  driverLocationText: { fontSize: 12 },
  driverUpdated: { fontSize: 10, marginTop: 2 },
  miniMapContainer: { marginTop: 8, height: 100, borderRadius: 12, overflow: 'hidden' },
  miniMap: { flex: 1 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
  navButton: { alignItems: 'center' },
});
