import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

const Button = ({ onPress, children, style, variant, theme }) => {
  const buttonStyle = [
    styles.button,
    style,
    variant === 'outline' ? { ...styles.outlineButton, borderColor: theme.divider } : null
  ];
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {children}
    </TouchableOpacity>
  );
};

export default function EmergencyContactNotifications({ onNavigate }) {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      driverName: 'Hudson Williams',
      type: 'invite',
      message: 'Hudson Williams wants to add you as an emergency contact',
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      driverName: 'John Doe',
      type: 'alert',
      message: 'Driver status changed to Warning',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      driverName: 'Robert Chen',
      type: 'invite',
      message: 'Robert Chen wants to add you as an emergency contact',
      timestamp: '1 day ago',
      status: 'pending'
    }
  ]);

  const handleAccept = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, status: 'accepted' } : notif
      )
    );
  };

  const handleDecline = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, status: 'declined' } : notif
      )
    );
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.notificationCard, { backgroundColor: theme.surface, shadowColor: '#000' }]}>
      <View style={styles.notificationContent}>
        <View style={[styles.avatar, { backgroundColor: theme.primarySoft }]}>
          <FontAwesome5 name="user" size={20} color={theme.primary} />
        </View>

        <View style={styles.textContent}>
  {item.type === 'invite' ? (
    <Text style={[styles.message, { color: theme.textPrimary }]}>
      <Text style={{ fontWeight: '900' }}>{item.driverName}</Text> wants to add you as an emergency contact
    </Text>
  ) : (
    <Text style={[styles.message, { color: theme.textPrimary }]}>
      <Text style={{ fontWeight: '900' }}>Driver</Text> status changed to <Text style={{ fontWeight: '900' }}>Warning</Text>
    </Text>
  )}

  <Text style={[styles.timestamp, { color: theme.textSecondary }]}>{item.timestamp}</Text>

  {item.type === 'invite' && item.status === 'pending' && (
    <View style={styles.actionButtons}>
      <Button onPress={() => handleAccept(item.id)} style={{ flex: 1, backgroundColor: theme.primary }} theme={theme}>
        <MaterialIcons name="check" size={16} color="white" />
        <Text style={[styles.acceptText, { color: theme.background }]}> Accept</Text>
      </Button>
      <Button
        onPress={() => handleDecline(item.id)}
        variant="outline"
        style={{ flex: 1 }}
        theme={theme}
      >
        <MaterialIcons name="close" size={16} color={theme.textSecondary} />
        <Text style={[styles.declineText, { color: theme.textSecondary }]}> Decline</Text>
      </Button>
    </View>
  )}

  {item.status === 'accepted' && <Text style={[styles.acceptedText, { color: theme.level1 }]}>✓ Accepted</Text>}
  {item.status === 'declined' && <Text style={[styles.declinedText, { color: theme.textSecondary }]}>Declined</Text>}
</View>

      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={[styles.headerTitle, { color: theme.background }]}>Notifications</Text>
        <Text style={[styles.headerSubtitle, { color: theme.primarySoft }]}>Invites and alerts</Text>
      </View>

      <View style={styles.listContainer}>
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="bell" size={64} color={theme.divider} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No notifications yet</Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        )}
      </View>

      <View style={[styles.bottomNav, { backgroundColor: theme.surface, borderTopColor: theme.divider }]}>
        <NavButton icon="users" label="Drivers" active={false} theme={theme} onPress={() => onNavigate('ec-dashboard')} />
        <NavButton icon="bell" label="Notifications" active theme={theme} onPress={() => onNavigate('ec-notifications')} />
        <NavButton icon="settings" label="Settings" active={false} theme={theme} onPress={() => onNavigate('ec-settings')} />
      </View>
    </View>
  );
}

/* Bottom Nav Item */
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
  headerTitle: { fontSize: 24, marginBottom: 4 },
  headerSubtitle: { fontSize: 14 },
  listContainer: { flex: 1, padding: 16 },
  notificationCard: { borderRadius: 12, padding: 12, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  notificationContent: { flexDirection: 'row', alignItems: 'flex-start' },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  textContent: { flex: 1 },
  message: { fontSize: 14, marginBottom: 2 },
  timestamp: { fontSize: 12 },
  actionButtons: { flexDirection: 'row', marginTop: 8, gap: 8 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 6, borderRadius: 6 },
  outlineButton: { borderWidth: 1, backgroundColor: 'transparent' },
  acceptText: { fontSize: 14 },
  declineText: { fontSize: 14 },
  acceptedText: { fontSize: 12, marginTop: 4 },
  declinedText: { fontSize: 12, marginTop: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 64 },
  emptyText: { marginTop: 12, fontSize: 16 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
  navButton: { alignItems: 'center' },
});
