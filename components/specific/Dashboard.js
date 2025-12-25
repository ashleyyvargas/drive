import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import driverImage from '../../assets/driver.png';

export default function Dashboard({ onNavigate }) {
  const [selectedMonitoring, setSelectedMonitoring] = useState(null);
  const [showWarningDetails, setShowWarningDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentAlert = {
    level: 'level3',
    status: 'EXTREMELY DROWSY',
    color: '#EF4444',
    timestamp: '9:35 PM',
    date: '12-15-2025',
  };

  const getLevelText = (level) => {
    if (level === 'level3') return 'LEVEL 3 WARNING';
    if (level === 'level2') return 'LEVEL 2 WARNING';
    if (level === 'level1') return 'LEVEL 1 WARNING';
    return '';
  };

  if (showNotifications) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Panel</Text>
        <TouchableOpacity onPress={() => setShowNotifications(false)}>
          <Text style={{ marginTop: 20, color: '#1E88E5' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (showWarningDetails) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Warning Details</Text>
        <TouchableOpacity onPress={() => setShowWarningDetails(false)}>
          <Text style={{ marginTop: 20, color: '#1E88E5' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (selectedMonitoring) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Monitoring Report: {selectedMonitoring}</Text>
        <TouchableOpacity onPress={() => setSelectedMonitoring(null)}>
          <Text style={{ marginTop: 20, color: '#1E88E5' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1E88E5' }}>
      <TouchableOpacity
        onPress={() => setShowNotifications(true)}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 10,
        }}
      >
        <Ionicons name="person-outline" size={26} color="white" />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 60, zIndex: 5 }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 65,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={driverImage}
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              borderWidth: 6,
              borderColor: currentAlert.color,
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: -40,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: 20,
        }}
      >

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            padding: 14,
            borderRadius: 18,
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontWeight: '600', marginRight: 8 }}>
            CURRENT STATUS:
          </Text>
          <Text style={{ color: currentAlert.color, fontWeight: '700', flex: 1 }}>
            {currentAlert.status}
          </Text>
          <Ionicons name="alert-circle" size={20} color={currentAlert.color} />
        </View>

        {/* Recent Activity */}
        <Text style={{ fontWeight: '600', marginBottom: 10 }}>
          Recent Activity
        </Text>

        <TouchableOpacity
          onPress={() => setShowWarningDetails(true)}
          style={{
            backgroundColor: '#E5E5E5',
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Ionicons name="warning" size={50} color="#EF4444" />
          <Text style={{ color: '#EF4444', fontWeight: '700', marginTop: 10 }}>
            {getLevelText(currentAlert.level)}
          </Text>
          <Text style={{ fontSize: 12, color: '#555', marginTop: 4 }}>
            {currentAlert.date} {currentAlert.timestamp}
          </Text>
        </TouchableOpacity>

        {/* Monitoring Activity */}
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Monitoring Activity
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MonitoringButton
            icon={<Ionicons name="eye" size={30} color="#38BDF8" />}
            label="EYE-LID MONITORING"
            onPress={() => setSelectedMonitoring('eye')}
          />
          <MonitoringButton
            icon={<Ionicons name="car-sport" size={30} color="#38BDF8" />}
            label="HAND ON STEERING WHEEL"
            onPress={() => setSelectedMonitoring('steering')}
          />
          <MonitoringButton
            icon={<MaterialCommunityIcons name="yawn" size={30} color="#38BDF8" />}
            label="YAWNING"
            onPress={() => setSelectedMonitoring('yawn')}
          />
        </ScrollView>
      </View>

      {/* Bottom nav */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: 'white' }}>
        <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')} active />
        <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} />
        <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} />
        <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} />
        <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} />
      </View>
    </View>
  );
}

/* Monitoring cards */
function MonitoringButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 150,
        height: 130,
        backgroundColor: '#1E3A8A',
        borderRadius: 20,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
    >
      {icon}
      <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Bottom nav item */
function NavItem({ icon, label, onPress, active }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={active} style={{ alignItems: 'center' }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: active ? '#3B82F6' : 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Feather name={icon} size={18} color={active ? '#fff' : '#3B82F6'} />
      </View>
      <Text style={{ fontSize: 12, color: '#3B82F6', marginTop: 4 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
