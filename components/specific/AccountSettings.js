import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function AccountSettings({ onBack, userName, userPhone }) {
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [firstName, setFirstName] = useState(userName?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(userName?.split(' ')[1] || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    setEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (!currentPassword || newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match or current password missing');
      return;
    }

    Alert.alert('Success', 'Password changed successfully!');
    setChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* AVATAR */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.changePhoto}>Change Photo</Text>
        </View>

        {/* PROFILE INFO */}
        <Text style={styles.sectionTitle}>Profile Information</Text>

        {renderInput('First Name', firstName, setFirstName, !editing)}
        {renderInput('Last Name', lastName, setLastName, !editing)}
        {renderInput('Phone Number', userPhone, () => {}, true)}

        {!editing ? (
          <PrimaryButton title="Edit Profile" onPress={() => setEditing(true)} />
        ) : (
          <View style={styles.row}>
            <OutlineButton title="Cancel" onPress={() => setEditing(false)} />
            <PrimaryButton title="Save" onPress={handleSave} />
          </View>
        )}

        {/* SECURITY */}
        <Text style={styles.sectionTitle}>Security</Text>

        {!changingPassword ? (
          <OutlineButton
            title="Change Password"
            onPress={() => setChangingPassword(true)}
          />
        ) : (
          <>
            {renderInput('Current Password', currentPassword, setCurrentPassword, false, true)}
            {renderInput('New Password', newPassword, setNewPassword, false, true)}
            {renderInput('Confirm New Password', confirmPassword, setConfirmPassword, false, true)}

            <View style={styles.row}>
              <OutlineButton
                title="Cancel"
                onPress={() => {
                  setChangingPassword(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              />
              <PrimaryButton title="Update Password" onPress={handleChangePassword} />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

/* ================= HELPERS ================= */

function renderInput(label, value, onChange, disabled = false, secure = false) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        editable={!disabled}
        secureTextEntry={secure}
        style={[styles.input, disabled && styles.inputDisabled]}
      />
      {label === 'Phone Number' && (
        <Text style={styles.helper}>Phone number cannot be changed</Text>
      )}
    </View>
  );
}

function PrimaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

function OutlineButton({ title, onPress }) {
  return (
    <Pressable style={styles.outlineButton} onPress={onPress}>
      <Text style={styles.outlineText}>{title}</Text>
    </Pressable>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backText: { color: '#ffffff', fontSize: 16, marginBottom: 8 },
  headerTitle: { color: '#ffffff', fontSize: 24, fontWeight: '600' },
  content: { padding: 24, paddingBottom: 40 },
  avatarContainer: { alignItems: 'center', marginBottom: 32 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: { fontSize: 40, color: '#ffffff' },
  changePhoto: { color: '#2563EB', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16, marginTop: 24 },
  field: { marginBottom: 12 },
  label: { fontSize: 14, color: '#374151', marginBottom: 6 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputDisabled: { backgroundColor: '#F3F4F6' },
  helper: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  row: { flexDirection: 'row', gap: 12, marginTop: 12 },
  primaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  primaryText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  outlineButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  outlineText: { color: '#1E3A8A', fontSize: 16, fontWeight: '500' },
});
