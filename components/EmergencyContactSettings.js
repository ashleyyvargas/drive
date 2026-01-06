// EmergencyContactSettings.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import { Feather, Ionicons, Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { lightTheme, darkTheme, SPACING, RADIUS, FONT } from './theme';

export default function EmergencyContactSettings({ onNavigate, onSwitchToDriver }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDriverMode, setIsDriverMode] = useState(false);
  const [showDriverConfirm, setShowDriverConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const confirmDriverSwitch = () => {
    setShowDriverConfirm(false);
    setIsDriverMode(true);
    onSwitchToDriver?.();
  };

  // Sample connected accounts
  const connectedAccounts = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  const disconnectAccount = () => {
    console.log('Disconnected:', selectedAccount.name);
    setShowDisconnectModal(false);
    setSelectedAccount(null);
  };

  const renderConnectedAccount = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={[styles.itemTitle, { color: theme.textPrimary, fontWeight: '700' }]}>{item.name}</Text>
          <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>{item.email}</Text>
        </View>
        <Pressable
          onPress={() => {
            setSelectedAccount(item);
            setShowDisconnectModal(true);
          }}
        >
          <Entypo name="dots-three-vertical" size={20} color={theme.textSecondary} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={[{}]}
        renderItem={null}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: theme.primary }]}>
              <Text style={[styles.headerTitle, { color: 'white' }]}>Settings</Text>
              <Text style={[styles.headerSubtitle, { color: 'white' }]}>Manage your preferences</Text>
            </View>

            {/* Emergency Contact Card */}
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <View style={styles.row}>
                <View style={[styles.avatar, { backgroundColor: theme.primarySoft }]}>
                  <Feather name="user" size={32} color={theme.primary} />
                </View>
                <View>
                  <Text style={[styles.name, { color: theme.textPrimary, fontWeight: '700' }]}>Emergency Contact</Text>
                  <Text style={[styles.email, { color: theme.textSecondary }]}>+63 912 345 6789</Text>
                </View>
              </View>
            </View>

            {/* Mode Section */}
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Mode</Text>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.primarySoft }]}>
                    <AntDesign name="user-switch" size={20} color={theme.primary} />
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: theme.textPrimary, fontWeight: '700' }]}>Driver Mode</Text>
                    <Text style={[styles.itemSubtitle, { color: theme.textSecondary }]}>Switch to driver features</Text>
                  </View>
                </View>
                <Pressable
                  style={[styles.toggle, { backgroundColor: isDriverMode ? theme.primary : theme.divider }]}
                  onPress={() => setShowDriverConfirm(true)}
                >
                  <View style={[styles.toggleKnob, isDriverMode && { alignSelf: 'flex-end' }]} />
                </Pressable>
              </View>
            </View>

            {/* Connected Drivers */}
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Pressable style={styles.listItem} onPress={() => onNavigate('connected-accounts')}>
                <View style={styles.row}>
                  <Feather name="users" size={20} color={theme.textSecondary} />
                  <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Connected drivers</Text>
                </View>
                <Feather name="chevron-right" size={20} color={theme.navInactive} />
              </Pressable>
              <View style={[styles.divider, { backgroundColor: theme.divider }]} />
              <View style={styles.listItem}>
                <View style={styles.row}>
                  <Ionicons name="moon-outline" size={20} color={theme.textSecondary} />
                  <Text style={[styles.itemTitle, { color: theme.textPrimary }]}>Dark Mode</Text>
                </View>
                <Pressable
                  style={[styles.toggle, { backgroundColor: isDarkMode ? theme.primary : theme.divider }]}
                  onPress={() => setIsDarkMode(!isDarkMode)}
                >
                  <View style={[styles.toggleKnob, isDarkMode && { alignSelf: 'flex-end' }]} />
                </Pressable>
              </View>
            </View>

            {/* Log Out */}
            <Pressable style={[styles.card, { backgroundColor: theme.card }]} onPress={() => setShowLogoutConfirm(true)}>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Feather name="log-out" size={20} color={theme.danger} />
                  <Text style={[styles.logoutText, { color: theme.danger, fontWeight: '700' }]}>Log Out</Text>
                </View>
                <Feather name="chevron-right" size={20} color={theme.navInactive} />
              </View>
            </Pressable>
          </>
        }
      />

      {/* Driver Confirm Modal */}
      <Modal transparent visible={showDriverConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Switch Mode</Text>
            <Text style={[styles.modalText, { color: theme.textSecondary }]}>Switch to Driver mode?</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowDriverConfirm(false)}>
                <Text style={[styles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmDriverSwitch}>
                <Text style={[styles.confirmText, { color: theme.primary }]}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout Modal */}
      <Modal transparent visible={showLogoutConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Log Out</Text>
            <Text style={[styles.modalText, { color: theme.textSecondary }]}>Are you sure you want to log out?</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowLogoutConfirm(false)}>
                <Text style={[styles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowLogoutConfirm(false);
                  onNavigate('login', {});
                }}
              >
                <Text style={[styles.confirmText, { color: theme.danger }]}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Disconnect Modal */}
      <Modal transparent visible={showDisconnectModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>Disconnect Account</Text>
            <Text style={[styles.modalText, { color: theme.textSecondary }]}>
              Are you sure you want to disconnect {selectedAccount?.name}?
            </Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowDisconnectModal(false)}>
                <Text style={[styles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
              </Pressable>
              <Pressable onPress={disconnectAccount}>
                <Text style={[styles.confirmText, { color: theme.danger }]}>Disconnect</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card, borderColor: theme.divider }]}>
        <NavItem icon="users" library="fa5" label="Drivers" theme={theme} onPress={() => onNavigate('ec-dashboard')} />
        <NavItem icon="bell" label="Notifications" theme={theme} onPress={() => onNavigate('ec-notifications')} />
        <NavItem icon="settings" label="Settings" active theme={theme} onPress={() => onNavigate('ec-settings')} />
      </View>
    </View>
  );
}

function NavItem({ icon, label, active, onPress, theme, library = 'feather' }) {
  const IconComponent = library === 'fa5' ? FontAwesome5 : Feather;

  return (
    <Pressable style={styles.navItem} onPress={onPress}>
      <IconComponent name={icon} size={22} color={active ? theme.primary : theme.navInactive} />
      <Text style={{ fontSize: 12, color: active ? theme.primary : theme.navInactive }}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingVertical: SPACING.l, paddingHorizontal: SPACING.m },
  headerTitle: { fontSize: 24, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 4 },
  card: { borderRadius: RADIUS.m, padding: SPACING.m, margin: SPACING.m, marginTop: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.s },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 16 },
  email: { fontSize: 14 },
  sectionLabel: { fontSize: 14, marginBottom: SPACING.s },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 14 },
  itemSubtitle: { fontSize: 12 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.s },
  divider: { height: 1, marginVertical: SPACING.s },
  toggle: { width: 48, height: 24, borderRadius: 12, padding: 2 },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' },
  logoutText: { fontSize: 14 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: SPACING.s, borderTopWidth: 1 },
  navItem: { alignItems: 'center', gap: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '85%', borderRadius: RADIUS.m, padding: SPACING.m },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: SPACING.s },
  modalText: { fontSize: 14, marginBottom: SPACING.m },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: SPACING.m },
  cancelText: { fontSize: 14 },
  confirmText: { fontSize: 14, fontWeight: '700' },
});
