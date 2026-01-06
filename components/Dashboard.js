import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import driverImage from '../assets/driver.png';
import { lightTheme, darkTheme } from './theme'; // <-- import theme

export default function Dashboard({ onNavigate }) {
  const [selectedMonitoring, setSelectedMonitoring] = useState(null);
  const [showWarningDetails, setShowWarningDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // optional dark mode toggle

  const theme = darkMode ? darkTheme : lightTheme;

  const currentAlert = {
    level: 'level3',
    status: 'EXTREMELY DROWSY',
    color: theme.danger,
    timestamp: '9:35 PM',
    date: '12-15-2025',
  };

  const getLevelText = (level) => {
    if (level === 'level3') return 'LEVEL 3 WARNING';
    if (level === 'level2') return 'LEVEL 2 WARNING';
    if (level === 'level1') return 'LEVEL 1 WARNING';
    return '';
  };

  if (showNotifications || showWarningDetails || selectedMonitoring) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <Text style={{ color: theme.textPrimary }}>Panel</Text>
        <TouchableOpacity
          onPress={() => {
            setShowNotifications(false);
            setShowWarningDetails(false);
            setSelectedMonitoring(null);
          }}
        >
          <Text style={{ marginTop: 20, color: theme.primary }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {/* Notification */}
      <TouchableOpacity
        onPress={() => setShowNotifications(true)}
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
      >
        <Feather name="bell" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Driver Avatar */}
      <View style={{ alignItems: 'center', marginTop: 60, zIndex: 5 }}>
        <View
          style={{
            width: 104,
            height: 104,
            borderRadius: 52,
            backgroundColor: theme.background,
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
              borderWidth: 5,
              borderColor: currentAlert.color,
            }}
          />
        </View>
      </View>

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          marginTop: -40,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          padding: 20,
        }}
      >
        {/* Recent Warning */}
        <Text
          style={{
            fontWeight: '600',
            color: theme.textPrimary,
            marginTop: 28,
            marginBottom: 12,
          }}
        >
          Recent Warning
        </Text>

        <TouchableOpacity
          onPress={() => setShowWarningDetails(true)}
          style={{
            backgroundColor: theme.surface,
            borderRadius: 22,
            padding: 20,
            alignItems: 'center',
            marginBottom: 28,
          }}
        >
          <Ionicons name="warning" size={48} color={currentAlert.color} />

          <Text
            style={{
              color: currentAlert.color,
              fontWeight: '700',
              marginTop: 10,
              fontSize: 16,
            }}
          >
            {getLevelText(currentAlert.level)}
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: theme.textSecondary,
              marginTop: 4,
            }}
          >
            {currentAlert.date} • {currentAlert.timestamp}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 14,
              backgroundColor: theme.primarySoft,
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 14,
            }}
          >
            <Ionicons
              name="alert-circle"
              size={18}
              color={currentAlert.color}
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                color: currentAlert.color,
                fontWeight: '700',
                fontSize: 13,
              }}
            >
              {currentAlert.status}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Monitoring Activity */}
        <Text
          style={{
            fontWeight: '600',
            color: theme.textPrimary,
            marginBottom: 12,
          }}
        >
          Monitoring Activity
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <MonitoringButton
            icon={<Ionicons name="eye" size={30} color={theme.primary} />}
            label="EYE-LID MONITORING"
            onPress={() => setSelectedMonitoring('eye')}
            theme={theme}
          />
          <MonitoringButton
            icon={<MaterialCommunityIcons name="steering" size={30} color={theme.primary} />}
            label="HAND ON STEERING WHEEL"
            onPress={() => setSelectedMonitoring('steering')}
            theme={theme}
          />
          <MonitoringButton
            icon={<Ionicons name="car-sport" size={30} color={theme.primary} />}
            label="YAWNING"
            onPress={() => setSelectedMonitoring('yawn')}
            theme={theme}
          />
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 12,
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderColor: theme.divider,
        }}
      >
        <NavItem icon="home" label="Home" active theme={theme} />
        <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} theme={theme} />
        <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} theme={theme} />
        <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} theme={theme} />
        <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} theme={theme} />
      </View>
    </View>
  );
}

/* Monitoring Card */
function MonitoringButton({ icon, label, onPress, theme }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 150,
        height: 130,
        backgroundColor: theme.surface,
        borderRadius: 20,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
    >
      {icon}
      <Text
        style={{
          color: theme.textPrimary,
          fontSize: 12,
          textAlign: 'center',
          marginTop: 8,
          fontWeight: '500',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
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
          color={active ? theme.primary : theme.textSecondary} // white for active
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: active ? theme.primary : theme.textSecondary, // white for active
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
