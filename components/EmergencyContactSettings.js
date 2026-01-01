import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import { Feather, Ionicons, Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';


const lightTheme = {
  background: '#F9FAFB',
  card: '#FFFFFF',
  text: '#111827',
  subText: '#6B7280',
  divider: '#E5E7EB',
  primary: '#1E3A8A',
  secondary: '#DBEAFE',
  danger: '#DC2626',
  navInactive: '#9CA3AF',
};

const darkTheme = {
  background: '#0F172A',
  card: '#1E293B',
  text: '#F9FAFB',
  subText: '#94A3B8',
  divider: '#334155',
  primary: '#3B82F6',
  secondary: '#1E40AF',
  danger: '#F87171',
  navInactive: '#64748B',
};


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
          <Text style={[styles.itemTitle, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.itemSubtitle, { color: theme.subText }]}>{item.email}</Text>
        </View>
        <Pressable
          onPress={() => {
            setSelectedAccount(item);
            setShowDisconnectModal(true);
          }}
        >
          <Entypo name="dots-three-vertical" size={20} color={theme.subText} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
          
            <View style={[styles.header, { backgroundColor: theme.primary }]}>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Manage your preferences</Text>
            </View>


            <View
              style={[styles.card, { backgroundColor: theme.card }]}>
              <View style={styles.row}>
                <View style={[styles.avatar, { backgroundColor: theme.secondary }]}>
                  <Feather name="user" size={32} color={theme.primary} />
                </View>
                <View>
                  <Text style={[styles.name, { color: theme.text }]}>Emergency Contact</Text>
                  <Text style={[styles.email, { color: theme.subText }]}>+63 912 345 6789</Text>
                </View>
              </View>
            </View>


            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.sectionLabel, { color: theme.subText }]}>Mode</Text>
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <View style={[styles.iconCircle, { backgroundColor: theme.secondary }]}>
                    <AntDesign name="user-switch" size={20} color={theme.primary} />
                  </View>
                  <View>
                    <Text style={[styles.itemTitle, { color: theme.text }]}>Driver Mode</Text>
                    <Text style={[styles.itemSubtitle, { color: theme.subText }]}>
                      Switch to driver features
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={[styles.toggle, { backgroundColor: isDriverMode ? theme.primary : theme.divider }]}
                  onPress={() => setShowDriverConfirm(true)}
                >
                  <View style={[styles.toggleKnob, isDriverMode && styles.toggleKnobOn]} />
                </Pressable>
              </View>
            </View>


            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Pressable
              style={styles.listItem}
              onPress={() => onNavigate('connected-accounts')}>
                <View style={styles.row}>
                  <Feather name="users" size={20} color={theme.subText} />
                  <Text style={[styles.itemTitle, { color: theme.text }]}>
                    Connected drivers
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color={theme.navInactive} />
              </Pressable>
            <View style={[styles.divider, { backgroundColor: theme.divider }]} />
              <View style={styles.listItem}>
                <View style={styles.row}>
                  <Ionicons name="moon-outline" size={20} color={theme.subText} />
                  <Text style={[styles.itemTitle, { color: theme.text }]}>Dark Mode</Text>
                </View>
                <Pressable
                  style={[styles.toggle, { backgroundColor: isDarkMode ? theme.primary : theme.divider }]}
                  onPress={() => setIsDarkMode(!isDarkMode)}
                >
                  <View style={[styles.toggleKnob, isDarkMode && styles.toggleKnobOn]} />
                </Pressable>
              </View>
            </View>


            <Pressable
              style={[styles.card, { backgroundColor: theme.card }]}
              onPress={() => setShowLogoutConfirm(true)}
            >
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <Feather name="log-out" size={20} color={theme.danger} />
                  <Text style={[styles.logoutText, { color: theme.danger }]}>Log Out</Text>
                </View>
                <Feather name="chevron-right" size={20} color={theme.navInactive} />
              </View>
            </Pressable>
          </>
        }
      />


      <Modal transparent visible={showDriverConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Switch Mode</Text>
            <Text style={styles.modalText}>Switch to Driver mode?</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowDriverConfirm(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmDriverSwitch}>
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>


      <Modal transparent visible={showLogoutConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowLogoutConfirm(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
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


      <Modal transparent visible={showDisconnectModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Disconnect Account</Text>
            <Text style={styles.modalText}>
              Are you sure you want to disconnect {selectedAccount?.name}?
            </Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowDisconnectModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={disconnectAccount}>
                <Text style={[styles.confirmText, { color: theme.danger }]}>Disconnect</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>


      <View
        style={[styles.bottomNav, { backgroundColor: theme.card, borderColor: theme.divider }]}
      >
        <NavItem
          icon="users"
          library='fa5'
          label="Drivers"
          theme={theme}
          onPress={() => onNavigate('ec-dashboard')}
        />
        <NavItem
          icon="bell"
          label="Notifications"
          theme={theme}
          onPress={() => onNavigate('ec-notifications')}
        />
        <NavItem
          icon="settings"
          label="Settings"
          active
          theme={theme}
          onPress={() => onNavigate('ec-settings')}
        />
      </View>
    </View>
  );
}


function NavItem({ icon, label, active, onPress, theme, library = 'feather' }) {
  const IconComponent = library === 'fa5' ? FontAwesome5 : Feather;
  
  return (
    <Pressable style={styles.navItem} onPress={onPress}>
      <IconComponent
        name={icon}
        size={22}
        color={active ? theme.primary : theme.navInactive}
      />
      <Text
        style={{
          fontSize: 12,
          color: active ? theme.primary : theme.navInactive,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingVertical: 24, paddingHorizontal: 16 },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: '600' },
  headerSubtitle: { color: '#DBEAFE', fontSize: 14, marginTop: 4 },
  content: { padding: 24, paddingBottom: 40 },
  card: { borderRadius: 12, padding: 16, margin: 10, marginTop: 0 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '500' },
  email: { fontSize: 14 },
  sectionLabel: { fontSize: 14, marginBottom: 12 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 14 },
  itemSubtitle: { fontSize: 12 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  divider: { height: 1, marginVertical: 8 },
  toggle: { width: 48, height: 24, borderRadius: 12, padding: 2 },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF' },
  toggleKnobOn: { alignSelf: 'flex-end' },
  logoutText: { fontSize: 14 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
  navItem: { alignItems: 'center', gap: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '85%', backgroundColor: 'white', borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  modalText: { fontSize: 14, color: '#4B5563', marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  cancelText: { color: '#6B7280' },
  confirmText: { color: '#2563EB', fontWeight: 'bold' },
});
