import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome5, Feather } from '@expo/vector-icons';

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

  // Simulate live movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe':
        return '#16A34A';
      case 'warning':
        return '#FACC15';
      case 'danger':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connected Drivers</Text>
        <Text style={styles.headerSubtitle}>Monitor drivers who added you</Text>
      </View>

      {/* Drivers List */}
      <ScrollView contentContainerStyle={styles.driverList}>
        {drivers.map((driver) => (
          <TouchableOpacity
            key={driver.id}
            style={styles.driverCard}
            onPress={() => onViewDriver(driver.id)}
          >
            <View style={styles.driverInfo}>
              <View style={styles.avatar}>
                <FontAwesome5 name="user" size={24} color="#1D4ED8" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.driverHeader}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(driver.status) }]}>
                    <Text style={styles.statusText}>{driver.status.toUpperCase()}</Text>
                  </View>
                </View>

                <View style={styles.driverLocation}>
                  <Feather name="map-pin" size={16} color="#6B7280" />
                  <Text style={styles.driverLocationText}>{driver.lastLocation}</Text>
                </View>

                <Text style={styles.driverUpdated}>Updated {driver.lastUpdate}</Text>

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
                        strokeColor="#2563EB"
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


      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => onNavigate('ec-dashboard')} style={styles.navButton}>
          <FontAwesome5 name="users" size={24} color="#1D4ED8" />
          <Text style={styles.navLabel}>Drivers</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNavigate('ec-notifications')} style={styles.navButton}>
          <Feather name="bell" size={24} color="#6B7280" />
          <Text style={styles.navLabelInactive}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onNavigate('ec-settings')} style={styles.navButton}>
          <Feather name="settings" size={24} color="#6B7280" />
          <Text style={styles.navLabelInactive}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { backgroundColor: '#1E40AF', paddingVertical: 24, paddingHorizontal: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  headerSubtitle: { fontSize: 14, color: '#BFDBFE', marginTop: 4 },
  driverList: { paddingHorizontal: 16, paddingVertical: 12 },
  driverCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  driverInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center' },
  driverHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  driverName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  statusText: { fontSize: 10, color: '#FFFFFF', fontWeight: 'bold' },
  driverLocation: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  driverLocationText: { fontSize: 12, color: '#6B7280' },
  driverUpdated: { fontSize: 10, color: '#9CA3AF', marginTop: 2 },
  miniMapContainer: { marginTop: 8, height: 100, borderRadius: 12, overflow: 'hidden' },
  miniMap: { flex: 1 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFFFFF', paddingVertical: 12, borderTopColor: '#E5E7EB', borderTopWidth: 1 },
  navButton: { alignItems: 'center' },
  navLabel: { fontSize: 12, color: '#1D4ED8', marginTop: 4 },
  navLabelInactive: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});
