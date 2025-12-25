import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import AccountSettings from './AccountSettings'; 
import About from './About';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

export default function Menu({
  onNavigate,
  userName = 'Teddy Dela Cruz',
  userPhone = '+63 912 345 6789',
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const menuItems = [
    {
      icon: <Ionicons name="notifications" size={20} color="#2563EB" />,
      label: 'Quick Alerts',
      action: () => {},
    },
    {
      icon: darkMode ? (
        <Ionicons name="sunny" size={20} color="#2563EB" />
      ) : (
        <Ionicons name="moon" size={20} color="#2563EB" />
      ),
      label: darkMode ? 'Light Mode' : 'Dark Mode',
      action: () => setDarkMode(!darkMode),
    },
    {
      icon: <Ionicons name="shield" size={20} color="#2563EB" />,
      label: 'Privacy Policy',
      action: () => setShowPrivacyPolicy(true),
    },
    {
      icon: <Feather name="file-text" size={20} color="#2563EB" />,
      label: 'Terms of Service',
      action: () => setShowTerms(true),
    },
    {
      icon: <Feather name="info" size={20} color="#2563EB" />,
      label: 'About',
      action: () => setShowAbout(true),
    },
    {
      icon: <Feather name="log-out" size={20} color="#DC2626" />,
      label: 'Log Out',
      action: () => onNavigate('login'),
    },
  ];

  if (showAccountSettings) {
    return (
      <AccountSettings
        userName={userName}
        userPhone={userPhone}
        onBack={() => setShowAccountSettings(false)}
      />
    );
  }

  if (showAbout) {
  return <About onBack={() => setShowAbout(false)} />;
  }

  if (showPrivacyPolicy) {
  return <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} />;
  }
  
  if (showTerms) {
  return <TermsOfService onBack={() => setShowTerms(false)} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileCard}
        onPress={() => setShowAccountSettings(true)}
      >
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color="white" />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userPhone}>{userPhone}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.action}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>

            {item.label.includes('Mode') ? (
              <Switch
                value={darkMode}
                onValueChange={item.action}
                trackColor={{ false: '#D1D5DB', true: '#2563EB' }}
                thumbColor="white"
              />
            ) : (
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#9CA3AF"
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: 'white' }}>
              <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')}  />
              <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} />
              <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} />
              <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} />
              <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} active />
            </View>
          </View>
  );
}

function NavItem({ icon, label, onPress, active }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={active} style={{ alignItems: 'center' }}>
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: active ? '#3B82F6' : 'white', alignItems: 'center', justifyContent: 'center' }}>
        <Feather name={icon} size={18} color={active ? '#ffffff' : '#3B82F6'} />
      </View>
      <Text style={{ color: '#3B82F6', fontSize: 12, marginTop: 4 }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E40AF',
    margin: 16,
    borderRadius: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  userPhone: { color: 'white', fontSize: 14, opacity: 0.9 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuLabel: { fontSize: 16, marginLeft: 12, color: '#111827' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#2563EB',
  },
  navButton: { alignItems: 'center' },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  navText: { fontSize: 10, color: 'white' },
});
