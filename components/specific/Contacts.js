import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const contacts = [
  {
    id: '1',
    name: 'DARREN LLOYD',
    role: 'Driver',
    phone: '+63 912 345 6789',
    color: '#EF4444',
  },
  {
    id: '2',
    name: 'DARREN LLOYD',
    role: 'Driver',
    phone: '+63 912 345 6789',
    color: '#10B981',
  },
  {
    id: '3',
    name: 'DARREN LLOYD',
    role: 'Driver',
    phone: '+63 912 345 6789',
    color: '#F59E0B',
  },
];

export default function Contacts({ onNavigate }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 48,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderColor: '#E5E7EB',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Contacts</Text>

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#2563EB',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Contacts List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderColor: '#F3F4F6',
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: item.color,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="person" size={24} color="#fff" />
            </View>

            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: '500' }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>
                {item.phone}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#2563EB',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="call" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, backgroundColor: 'white' }}>
          <NavItem icon="home" label="Home" onPress={() => onNavigate('dashboard')}  />
          <NavItem icon="clock" label="History" onPress={() => onNavigate('history')} />
          <NavItem icon="map-pin" label="Location" onPress={() => onNavigate('location')} />
          <NavItem icon="users" label="Contacts" onPress={() => onNavigate('contacts')} active />
          <NavItem icon="menu" label="Menu" onPress={() => onNavigate('menu')} />
        </View>
      </View>
  );
}

/* Bottom Nav Button */
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