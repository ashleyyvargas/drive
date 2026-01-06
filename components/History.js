import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

const historyData = [
  { id: 1, date: 'DEC 15, 2025', time: '09:15 AM', location: 'Quezon City, Metro Manila', level: 'level1', levelText: 'LEVEL 1 WARNING' },
  { id: 2, date: 'DEC 14, 2025', time: '02:30 PM', location: 'Makati City, Metro Manila', level: 'level2', levelText: 'LEVEL 2 WARNING' },
  { id: 3, date: 'DEC 14, 2025', time: '11:45 AM', location: 'Manila City, Metro Manila', level: 'level3', levelText: 'LEVEL 3 WARNING' },
  { id: 4, date: 'DEC 13, 2025', time: '08:20 AM', location: 'Pasig City, Metro Manila', level: 'level1', levelText: 'LEVEL 1 WARNING' },
  { id: 5, date: 'DEC 12, 2025', time: '05:15 PM', location: 'Taguig City, Metro Manila', level: 'level2', levelText: 'LEVEL 2 WARNING' },
];

export default function History({ onNavigate }) {
  const [darkMode, setDarkMode] = useState(false); // optional
  const theme = darkMode ? darkTheme : lightTheme;

  const getLevelColor = (level) => theme[level];

  const getIcon = (level) => {
    if (level === 'level1') return 'alert-circle-outline';
    if (level === 'level2') return 'alert-outline';
    return 'alert';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderColor: theme.divider, backgroundColor: theme.background }]}>
        <Text style={[styles.headerText, { color: theme.textPrimary }]}>History</Text>
      </View>

      {/* History List */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 110 }}>
        {historyData.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.card, { backgroundColor: theme.surface }]}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: getLevelColor(item.level) + '20' }, 
              ]}
            >
              <MaterialCommunityIcons
                name={getIcon(item.level)}
                size={26}
                color={getLevelColor(item.level)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.date, { color: theme.textSecondary }]}>{item.date}</Text>
              <Text style={[styles.level, { color: getLevelColor(item.level) }]}>{item.levelText}</Text>
              <Text style={[styles.location, { color: theme.textPrimary }]}>{item.location}</Text>
              <Text style={[styles.time, { color: theme.textSecondary }]}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.navbar, { backgroundColor: theme.background, borderColor: theme.divider }]}>
        <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')} theme={theme} />
        <NavItem icon="clock" label="History" active theme={theme} />
        <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} theme={theme} />
        <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} theme={theme} />
        <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} theme={theme} />
      </View>
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
        <Feather
          name={icon}
          size={18}
          color={active ? theme.primary : theme.textSecondary}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          color: active ? theme.primary : theme.textSecondary,
          marginTop: 4,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 16, paddingHorizontal: 24, paddingBottom: 16, borderBottomWidth: 1 },
  headerText: { fontSize: 26, fontWeight: '700' },
  card: { flexDirection: 'row', borderRadius: 18, padding: 16, marginBottom: 14, alignItems: 'center' },
  iconBox: { width: 54, height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  date: { fontSize: 12, marginBottom: 2 },
  level: { fontSize: 13, fontWeight: '700', marginBottom: 4 },
  location: { fontSize: 12, marginBottom: 2 },
  time: { fontSize: 12 },
  navbar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1 },
});
