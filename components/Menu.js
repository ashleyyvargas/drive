import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import AccountSettings from './AccountSettings';
import About from './About';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import { lightTheme, darkTheme } from './theme';

export default function Menu({
  onNavigate,
  onSwitchToDriver,
  onSwitchToEmergencyContact,
  onLogout,
  userName = 'Teddy Dela Cruz',
  userPhone = '+63 912 345 6789',
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [isEmergencyContactMode, setIsEmergencyContactMode] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);
  const [pendingEmergencyValue, setPendingEmergencyValue] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleEmergencyContactToggle = (value) => {
    setPendingEmergencyValue(value);
    setShowEmergencyConfirm(true);
  };

  const confirmEmergencySwitch = () => {
    setShowEmergencyConfirm(false);
    setIsEmergencyContactMode(pendingEmergencyValue);
    pendingEmergencyValue
      ? onSwitchToEmergencyContact?.()
      : onSwitchToDriver?.();
  };

  const cancelEmergencySwitch = () => {
    setShowEmergencyConfirm(false);
    setPendingEmergencyValue(isEmergencyContactMode);
  };

  const menuItems = [
    {
      icon: <Ionicons name="moon" size={20} color={theme.primary} />,
      label: 'Dark Mode',
      action: () => setDarkMode(!darkMode),
      isSwitch: true,
      switchValue: darkMode,
    },
    {
      icon: <Ionicons name="shield" size={20} color={theme.primary} />,
      label: 'Privacy Policy',
      action: () => setShowPrivacyPolicy(true),
    },
    {
      icon: <Feather name="file-text" size={20} color={theme.primary} />,
      label: 'Terms of Service',
      action: () => setShowTerms(true),
    },
    {
      icon: <Feather name="info" size={20} color={theme.primary} />,
      label: 'About',
      action: () => setShowAbout(true),
    },
    {
      icon: <Feather name="log-out" size={20} color={theme.danger} />,
      label: 'Log Out',
      action: () => setShowLogoutConfirm(true),
    },
  ];

  if (showAccountSettings)
    return (
      <AccountSettings
        userName={userName}
        userPhone={userPhone}
        onBack={() => setShowAccountSettings(false)}
        darkMode={darkMode}
      />
    );

  if (showAbout) return <About onBack={() => setShowAbout(false)} darkMode={darkMode} />;
  if (showPrivacyPolicy)
    return <PrivacyPolicy onBack={() => setShowPrivacyPolicy(false)} darkMode={darkMode} />;
  if (showTerms) return <TermsOfService onBack={() => setShowTerms(false)} darkMode={darkMode} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile */}
      <TouchableOpacity
        style={[styles.profileCard, { backgroundColor: theme.primary }]}
        onPress={() => setShowAccountSettings(true)}
      >
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color='white' />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[styles.userName, { color: 'white' }]}>{userName}</Text>
          <Text style={[styles.userPhone, { color: 'white', opacity: 0.9 }]}>{userPhone}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color= 'white' />
      </TouchableOpacity>

      <ScrollView>
        {/* Mode Toggle */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Mode</Text>

          <View
            style={[
              styles.modeCard,
              { backgroundColor: theme.surface, borderColor: theme.divider },
            ]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.modeIcon, { backgroundColor: theme.primarySoft }]}>
                <AntDesign name="user-switch" size={20} color={theme.primary} />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={[styles.modeTitle, { color: theme.textPrimary }]}>
                  Emergency Contact Person
                </Text>
                <Text style={[styles.modeSub, { color: theme.textSecondary }]}>
                  Monitor connected drivers
                </Text>
              </View>
            </View>

            <Switch
              value={isEmergencyContactMode}
              onValueChange={handleEmergencyContactToggle}
            />
          </View>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { borderColor: theme.divider }]}
            onPress={item.action}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.icon}
              <Text style={[styles.menuLabel, { color: theme.textPrimary }]}>
                {item.label}
              </Text>
            </View>

            {item.isSwitch ? (
              <Switch value={item.switchValue} onValueChange={item.action} />
            ) : (
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View style={[styles.navbar, { borderColor: theme.divider }]}>
        <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')} theme={theme} />
        <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} theme={theme} />
        <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} theme={theme} />
        <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} theme={theme} />
        <NavItem icon="menu" label="Menu" active theme={theme} />
      </View>

      {/* Emergency Confirm Modal */}
      <ConfirmModal
        visible={showEmergencyConfirm}
        title="Switch Mode?"
        message={
          pendingEmergencyValue
            ? 'Switch to Emergency Contact mode?'
            : 'Switch back to Driver mode?'
        }
        onCancel={cancelEmergencySwitch}
        onConfirm={confirmEmergencySwitch}
        theme={theme}
      />

      {/* Logout Modal */}
      <ConfirmModal
        visible={showLogoutConfirm}
        title="Log Out"
        message="Are you sure you want to log out?"
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          onLogout();
        }}
        confirmText="Log Out"
        theme={theme}
      />
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
        <Feather name={icon} size={18} color={active ? theme.primary : theme.textSecondary} />
      </View>
      <Text style={{ fontSize: 12, color: active ? theme.primary : theme.textSecondary, marginTop: 4 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Reusable Modal */
function ConfirmModal({ visible, title, message, onCancel, onConfirm, confirmText = 'Confirm', theme }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={[styles.modalOverlay]}>
        <View style={[styles.modalBox, { backgroundColor: theme.background }]}>
          <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>{title}</Text>
          <Text style={[styles.modalText, { color: theme.textSecondary }]}>{message}</Text>
          <View style={styles.modalActions}>
            <Pressable
              style={[styles.cancelBtn, { backgroundColor: theme.divider }]}
              onPress={onCancel}
            >
              <Text style={{ color: theme.textPrimary }}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.confirmBtn, { backgroundColor: theme.primary }]}
              onPress={onConfirm}
            >
              <Text style={{ color: theme.background }}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: { fontSize: 18, fontWeight: '700' },
  userPhone: { fontSize: 14 },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginVertical: 12 },
  modeCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeTitle: { fontSize: 14, fontWeight: '600' },
  modeSub: { fontSize: 12 },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLabel: { fontSize: 16, marginLeft: 12 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  modalText: { fontSize: 14, marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  confirmBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
