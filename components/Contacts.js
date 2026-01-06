import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Image,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { lightTheme, darkTheme } from './theme';

const contacts = [
  { id: '1', name: 'DARREN LLOYD', role: 'Driver', phone: '+63 912 345 6789' },
  { id: '2', name: 'JANE ROE', role: 'Driver', phone: '+63 923 456 7890' },
  { id: '3', name: 'JUAN PEREZ', role: 'Driver', phone: '+63 987 654 3210' },
];

export default function Contacts({ onNavigate, darkMode = false }) {
  const theme = darkMode ? darkTheme : lightTheme;

  const [modalVisible, setModalVisible] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(query) ||
      contact.phone.replace(/\s+/g, '').includes(query)
    );
  });

  const cleanNumber = (phone) => phone.replace(/\s+/g, '');

  const makeCall = (phone) => Linking.openURL(`tel:${cleanNumber(phone)}`);
  const sendSMS = (phone) => Linking.openURL(`sms:${cleanNumber(phone)}`);

  const sendWhatsApp = async (phone) => {
    const number = cleanNumber(phone).replace('+', '');
    const url = `whatsapp://send?phone=${number}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : Alert.alert('WhatsApp not installed');
  };

  const showMessageOptions = (phone) => {
    Alert.alert('Send message via', '', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'SMS', onPress: () => sendSMS(phone) },
      { text: 'WhatsApp', onPress: () => sendWhatsApp(phone) },
    ]);
  };

  const registeredNumbers = ['+639123456789', '+639987654321'];

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderColor: theme.divider,
          backgroundColor: theme.background,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: '700', color: theme.textPrimary }}>
          Contacts
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={{
          marginHorizontal: 24,
          marginTop: 16,
          marginBottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.surface,
          borderRadius: 14,
          paddingHorizontal: 14,
          height: 44,
          borderWidth: 1,
          borderColor: theme.divider,
        }}
      >
        <Ionicons name="search" size={18} color={theme.textSecondary} />
        <TextInput
          placeholder="Search contacts"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.textSecondary}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 14,
            color: theme.textPrimary,
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Contact List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 14,
              marginBottom: 12,
              borderRadius: 16,
              backgroundColor: theme.surface,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: theme.primarySoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="person" size={22} color={theme.primary} />
            </View>

            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: theme.textPrimary }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 13, color: theme.textSecondary, marginTop: 2 }}>
                {item.phone}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => makeCall(item.phone)}
              onLongPress={() => showMessageOptions(item.phone)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: theme.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="call" size={18} color={theme.background} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingVertical: 12,
          borderTopWidth: 1,
          borderColor: theme.divider,
          backgroundColor: theme.background,
        }}
      >
        <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')} theme={theme} />
        <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} theme={theme} />
        <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} theme={theme} />
        <NavItem icon="users" label="Contacts" active theme={theme} />
        <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} theme={theme} />
      </View>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          position: 'absolute',
          bottom: 100,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.primary,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5,
          shadowColor: theme.primary,
          shadowOpacity: 0.25,
          shadowRadius: 6,
        }}
      >
        <Ionicons name="add" size={34} color={theme.background} />
      </TouchableOpacity>

      {/* Invite Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '85%', backgroundColor: theme.background, borderRadius: 16, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: theme.textPrimary, marginBottom: 12 }}>
              Enter contact number
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.divider,
                borderRadius: 10,
                height: 44,
                paddingHorizontal: 12,
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 16 }}>+63</Text>
              <TextInput
                placeholder="9XXXXXXXXX"
                keyboardType="phone-pad"
                value={contactNumber}
                onChangeText={(t) => setContactNumber(t.replace(/[^0-9]/g, '').slice(0, 10))}
                style={{ flex: 1, fontSize: 16, marginLeft: 8, color: theme.textPrimary }}
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <Pressable
              disabled={contactNumber.length !== 10}
              onPress={() => {
                const fullNumber = `+63${contactNumber}`;
                setToastMessage(
                  registeredNumbers.includes(fullNumber) ? 'Invite sent' : "Account doesn't exist"
                );
                setToastVisible(true);
                setTimeout(() => setToastVisible(false), 2500);
                setModalVisible(false);
                setContactNumber('');
              }}
              style={{
                backgroundColor: contactNumber.length === 10 ? theme.primary : theme.divider,
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: theme.background, fontSize: 16, fontWeight: '600' }}>Invite</Text>
            </Pressable>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: 'center', marginTop: 12, color: theme.textSecondary }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Toast */}
      {toastVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 90,
            alignSelf: 'center',
            backgroundColor: theme.surface,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image source={require('../assets/drivelogo.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
          <Text style={{ color: theme.textPrimary }}>{toastMessage}</Text>
        </View>
      )}
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
      <Text style={{ color: active ? theme.primary : theme.textSecondary, fontSize: 12, marginTop: 4 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
